import { articlesPageReducer } from "./model/slices/articlesPageSlice";
import { ArticlesPageSchema } from "./model/types/articlesPageSchema";
import { ArticlesPageAsync } from "./ui/ArticlesPage/ArticlesPage.async";

export {
  ArticlesPageAsync as ArticlesPage, articlesPageReducer, ArticlesPageSchema
};

