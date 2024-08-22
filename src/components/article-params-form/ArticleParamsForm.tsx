import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { Select } from '../select/Select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';

type Props = {
	onChangeParams: (param: ArticleStateType, event: React.FormEvent) => void;
	clearArticle: () => void;
};
export const ArticleParamsForm = (props: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [param, setParams] = useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLElement | null>(null);

	const handleOpenForm = () => {
		return setIsMenuOpen(!isMenuOpen);
	};

	const changeFontFamily = (font: OptionType) => {
		setParams({ ...param, fontFamilyOption: font });
	};

	const changeFontSize = (size: OptionType) => {
		setParams({ ...param, fontSizeOption: size });
	};

	const changeFontColor = (color: OptionType) => {
		setParams({ ...param, fontColor: color });
	};

	const changeBackgroundColor = (color: OptionType) => {
		setParams({ ...param, backgroundColor: color });
	};

	const changeContentWidth = (width: OptionType) => {
		setParams({ ...param, contentWidth: width });
	};

	const handleReset = () => {
		setParams(defaultArticleState);
		props.clearArticle();
	};

	const handleSubmit = (e: React.FormEvent) => {
		props.onChangeParams(param, e);
	};

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!asideRef.current?.contains(event.target)
			) {
				return handleOpenForm();
			}
		};

		isMenuOpen
			? window.addEventListener('mousedown', handleClick)
			: window.removeEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton onMouseDown={handleOpenForm} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						selected={param.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={changeFontFamily}></Select>
					<RadioGroup
						name={param.fontSizeOption.title}
						options={fontSizeOptions}
						selected={param.fontSizeOption}
						onChange={changeFontSize}
						title={'размер шрифта'}></RadioGroup>
					<Select
						title={'цвет шрифта'}
						selected={param.fontColor}
						options={fontColors}
						onChange={changeFontColor}></Select>
					<Separator></Separator>
					<Select
						title={'цвет фона'}
						selected={param.backgroundColor}
						options={backgroundColors}
						onChange={changeBackgroundColor}></Select>
					<Select
						title={'ширина контента'}
						selected={param.contentWidth}
						options={contentWidthArr}
						onChange={changeContentWidth}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
