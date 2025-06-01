import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticlesPageHasMore, getArticlesPageIsLoading, getArticlesPageNum } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";


export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
    >(
        'articlesPage/fetchNextArticlesPage',
        async (articleId, thunkApi) => {
            const { dispatch, getState, rejectWithValue } = thunkApi;

            const hasMore = getArticlesPageHasMore(getState());
            const isLoading = getArticlesPageIsLoading(getState());
            const page = getArticlesPageNum(getState());

            try {
                if (hasMore && !isLoading) {
                  dispatch(articlesPageActions.setPage(page + 1))
                  dispatch(fetchArticlesList({page: page + 1}))
                }
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
