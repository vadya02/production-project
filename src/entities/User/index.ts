import { UserRole } from './model/consts/userConsts';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserInited } from './model/selectors/getUserInited/getUserInited';
import { userActions, userReducers } from './model/slices/userSlice';

export { getUserAuthData, getUserInited, userActions, userReducers, UserRole };

export {
    getUserRoles,
    isUserAdmin,
    isUserManager,
} from './model/selectors/roleSelectors';

export type { User, UserSchema } from './model/types/user';
export { saveJsonSettings } from './model/services/saveJsonSettings';
export { useJsonSettings, getJsonSettings } from './model/selectors/jsonSettings';
export { initAuthData } from './model/services/initAuthData';
