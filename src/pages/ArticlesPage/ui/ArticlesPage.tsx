import { ArticleList, ArticleView } from "entity/Article";
import { ArticleViewSelector } from "entity/Article/ui/ArticleViewSelector/ArticleViewSelector";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import {
	DynamicModuleLoader,
	ReducersList,
} from "shared/lib/components/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Page } from "widgets/Page/Page";
import {
	getArticlesPageError,
	getArticlesPageInited,
	getArticlesPageIsLoading,
	getArticlesPageView,
} from "../model/selectors/articlesPageSelectors";
import { fetchNextArticlesPage } from "../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "../model/services/initArticlesPage/initArticlesPage";
import {
	articlesPageActions,
	articlesPageReducer,
	getArticles,
} from "../model/slices/articlesPageSlice";
import cls from "./ArticlesPage.module.scss";

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	console.log({ articles });
	const isLoading = useSelector(getArticlesPageIsLoading);
	const view = useSelector(getArticlesPageView);
	const error = useSelector(getArticlesPageError);
	const inited = useSelector(getArticlesPageInited);

	const onChangeView = useCallback(
		(view: ArticleView) => {
			dispatch(articlesPageActions.setView(view));
		},
		[dispatch]
	);

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesPage());
	}, []);

	useInitialEffect(() => {
		dispatch(initArticlesPage())
	});

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<Page
				className={classNames(cls.ArticlesPage, {}, [className])}
				onScrollEnd={onLoadNextPart}
			>
				<ArticleViewSelector onViewChange={onChangeView} view={view} />
				<ArticleList isLoading={isLoading} view={view} articles={articles} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
