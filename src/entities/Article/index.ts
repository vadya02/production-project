export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export type { Article } from './model/types/article';

export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';

export {
    ArticleSortField, ArticleType, ArticleView, ArticleBlockType,
} from './model/consts/articleConsts';
export { getArticleDetailsData } from './model/selectors/articleDetails';
export { ArticleList } from './ui/ArticleList/ArticleList';
export { articleDetailsActions } from './model/slice/articleDetailsSlice';
export * from './model/selectors/articleDetails';
