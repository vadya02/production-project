import { Country } from "entity/Country/model/types/country";
import { Currency } from "entity/Currency/model/types/currency";
import { fetchProfileData, getProfileError, getProfileIsLoading, getProfileReadonly, getProfileValidateErrors, profileActions, ProfileCard, profileReducer } from 'entity/Profile';
import { getProfileForm } from 'entity/Profile/model/selectors/getProfileForm/getProfileForm';
import { ValidateProfileError } from "entity/Profile/model/types/profile";
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { Page } from "widgets/Page/Page";
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
  const { t } = useTranslation('profile');
  
  const formData = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileIsLoading)
  const readonly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)
  const {id} = useParams<{id: string}>()

  useInitialEffect(() => {
    if (id) {
       dispatch(fetchProfileData(id))
    }
  })

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
  };

  const dispatch = useAppDispatch()

  const onChangeFirstname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ first: value || '' }));
  }, [dispatch]);

  const onChangeLastname = useCallback((value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || '' }));
  }, [dispatch]);

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

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames('', {}, [className])}>
          {t('PROFILE PAGE')}
          <ProfilePageHeader/>
          {validateErrors?.length && validateErrors.map((err) => (
              <Text
                  key={err}
                  theme={TextTheme.ERROR}
                  text={validateErrorTranslates[err]}
              />
          ))}
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
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;