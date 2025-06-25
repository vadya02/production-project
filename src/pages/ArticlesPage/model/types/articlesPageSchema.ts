import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleType, ArticleView } from 'entity/Article';
import { ArticleSortField } from 'entity/Article/model/types/article';
import { SortOrder } from 'shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    error?: string;
    isLoading?: boolean;
    // Pagination
    page: number;
    limit: number;
    hasMore?: boolean;
    // filters
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;

    _inited: boolean;
}
