import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Rating';
import { saveJsonSettings } from '../model/services/saveJsonSettings';
import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

interface SetJsonSettingsArgs {
    userId: string;
    jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        saveJsonSettings: build.mutation<User, SetJsonSettingsArgs>({
            query: ({ jsonSettings, userId }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
        getUserDataById: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        })
    }),
});

export const setJsonSettingsMutation = userApi.endpoints.saveJsonSettings.initiate;
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
