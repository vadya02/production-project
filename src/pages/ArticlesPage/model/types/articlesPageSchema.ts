import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleView } from "entity/Article";


export interface ArticlesPageSchema extends EntityState<Article> {
  error?: string;
  isLoading?: boolean;

  view: ArticleView;
  // Pagination
  page: number;
  limit?: number;
  hasMore?: boolean;

  _inited: boolean;
} 