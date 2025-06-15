import { ArticleDetails, ArticleList } from "entity/Article";
import { CommentList } from "entity/Comment";
import AddCommentForm from "features/addCommentForm/ui/AddCommentForm";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import {
	DynamicModuleLoader,
	ReducersList,
} from "shared/lib/components/DynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text, TextSize } from "shared/ui/Text/Text";
import { Page } from "widgets/Page/Page";
import { getArticleCommentsIsLoading } from "../model/selectors/comments";
import { getArticleRecommendationsIsLoading } from "../model/selectors/recommendations";
import { addCommentForArticle } from "../model/services/addCommentForArticle/addCommentForArticle";
import { fetchArticleRecommendations } from "../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { fetchCommentsByArticleId } from "../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { articleDetailsPageReducer } from "../model/slices";
import { getArticleComments } from "../model/slices/articleDetailsCommentsSlice";
import { getArticleRecommendations } from "../model/slices/articleDetailsPageRecommendationsSlice";
import cls from "./ArticleDetailsPage.module.scss";

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
	const { className } = props;
	const { t } = useTranslation("article-details");
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const comments = useSelector(getArticleComments.selectAll);
	const recommendations = useSelector(getArticleRecommendations.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	console.log({ recommendations });
	const recommendationsIsLoading = useSelector(
		getArticleRecommendationsIsLoading
	);
	const navigate = useNavigate();

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
		dispatch(fetchArticleRecommendations());
	});

	if (!id) {
		return (
			<div
				className={classNames(cls.ArticleDetailsPage, {}, [className])}
			>
				{t("Статья не найдена")}
			</div>
		);
	}

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentForArticle(text));
		},
		[dispatch]
	);

	const onBackToList = useCallback(() => {
		navigate(RoutePath.articles);
	}, [navigate]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page
				className={classNames(cls.ArticleDetailsPage, {}, [className])}
			>
				<Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
					{t("Назад к списку")}
				</Button>
				<ArticleDetails id={id} />
				<Text
					size={TextSize.L}
					className={cls.commentTitle}
					title={t("Рекомендуем")}
				/>
				<ArticleList
					articles={recommendations}
					isLoading={recommendationsIsLoading}
					className={cls.recommendations}
					target="_blank"
				/>
				<Text className={cls.commentTitle} title={t("Комментарии")} />
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList
					isLoading={commentsIsLoading}
					comments={comments}
				/>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
