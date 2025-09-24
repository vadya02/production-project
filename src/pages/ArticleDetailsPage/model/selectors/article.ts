import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entity/Article';
import { getUserAuthData } from '@/entity/User';

export const getCanEditArticle = createSelector(
    getArticleDetailsData,
    getUserAuthData,
    (article, user) => {
        if (!article || !user) {
            return false;
        }
        console.log({ article });
        return article.userId === user.id;
    },
);
