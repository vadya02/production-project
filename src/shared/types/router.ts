import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/entity/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
};
