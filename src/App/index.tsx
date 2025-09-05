import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { CSSProperties, useState } from 'react';
import styles from './index.module.scss';

export const App = () => {
	const [article, setArticle] = useState<ArticleStateType>(defaultArticleState);
	const changeArticle = (param: ArticleStateType, event: React.FormEvent) => {
		setArticle(param);
		event.preventDefault();
	};

	const resetArticle = () => {
		setArticle(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': article.fontFamilyOption.value,
					'--font-size': article.fontSizeOption.value,
					'--font-color': article.fontColor.value,
					'--container-width': article.contentWidth.value,
					'--bg-color': article.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onChangeParams={changeArticle}
				clearArticle={resetArticle}
			/>
			<Article />
		</main>
	);
};
