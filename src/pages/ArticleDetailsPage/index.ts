import { ArticleDetailsPageAsync } from './ui/ArticleDetailsPage/ArticleDetailsPage.async';

export { ArticleDetailsPageAsync as ArticleDetailsPage };

export type { ArticleDetailsPageSchema } from './model/types';
export type { ArticleDetailsCommentSchema } from './model/types/ArticleDetailsCommentsSchema';
export { articleDetailsPageReducer } from './model/slices/index';