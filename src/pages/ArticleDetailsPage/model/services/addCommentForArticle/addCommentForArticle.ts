import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entity/Article/model/selectors/articleDetails';
import { Comment } from 'entity/Comment';
import { getUserAuthData } from 'entity/User';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
    >(
        'articleDetails/addCommentForArticle',
        async (text, thunkApi) => {
            const {
                extra, rejectWithValue, dispatch, getState,
            } = thunkApi;
            const userData = getUserAuthData(getState());
            const article = getArticleDetailsData(getState());

            if (!userData || !article || !text) {
                return rejectWithValue('no data');
            }

            try {
                const response = await extra.api.post<Comment>('/comments', {
                    articleId: article.id,
                    userId: userData.id,
                    text,
                });

                if (!response.data) {
                    throw new Error();
                }

                dispatch(fetchCommentsByArticleId(article.id));

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
