import { Country } from "entity/Country/model/types/country";
import { Currency } from "entity/Currency/model/types/currency";
import { fetchProfileData, getProfileError, getProfileIsLoading, getProfileReadonly, profileActions, ProfileCard, profileReducer } from 'entity/Profile';
import { getProfileForm } from 'entity/Profile/model/selectors/getProfileForm/getProfileForm';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
  const {
    className,
  } = props;

  
  const formData = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileIsLoading)
  const readonly = useSelector(getProfileReadonly)

  const { t } = useTranslation();
  const dispatch = useAppDispatch()

  const onChangeFirstname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({
      first: value,
    }))
  }, [])

  const onChangeLastname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({
      lastname: value,
    }))
  }, [])

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value || '' }));
}, [dispatch]);

const onChangeAge = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
}, [dispatch]);

const onChangeUsername = useCallback((value?: string) => {
  dispatch(profileActions.updateProfile({ username: value || '' }));
}, [dispatch]);

const onChangeAvatar = useCallback((value?: string) => {
  dispatch(profileActions.updateProfile({ avatar: value || '' }));
}, [dispatch]);

const onChangeCurrency = useCallback((currency: Currency) => {
  dispatch(profileActions.updateProfile({ currency }));
}, [dispatch]);

const onChangeCountry = useCallback((country: Country) => {
  dispatch(profileActions.updateProfile({ country }));
}, [dispatch]);

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
          {t('PROFILE PAGE')}
          <ProfilePageHeader/>
          <ProfileCard
            data={formData}
            error={error}
            isLoading={isLoading}
            readonly={readonly}
            onChangeFirstname={onChangeFirstname}
            onChangeLastname={onChangeLastname}
            onChangeAge={onChangeAge}
            onChangeCity={onChangeCity}
            onChangeUsername={onChangeUsername}
            onChangeAvatar={onChangeAvatar}
            onChangeCurrency={onChangeCurrency}
            onChangeCountry={onChangeCountry}
  />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;