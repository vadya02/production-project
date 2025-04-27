import { lazy } from "react";


export const ArticleDetailsPageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  setTimeout(() => resolve(import('./ArticleDetailsPageAsync')), 3000);
}));
