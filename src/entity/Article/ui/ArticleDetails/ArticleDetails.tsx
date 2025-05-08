import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from 'entity/Article/model/selectors/articleDetails';
import { fetchArticleById } from 'entity/Article/model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from 'entity/Article/model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from 'entity/Article/model/types/article';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
}

export const ArticleDetails = (props: ArticleDetailsProps) => {
  const {
    className,
    id,
  } = props;
  const dispatch = useAppDispatch()
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData)
  const {t} = useTranslation()

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById('1'))
    }
  }, [dispatch])

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent block={block} className={cls.block} key={block.id}/>
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent block={block} className={cls.block} key={block.id}/>
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent block={block} className={cls.block} key={block.id}/>
      default:
        return null;
    }
  }, [])

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
    </>
    )
  } else if (error) {
    content = (<Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи.')}/>)
  } else {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar
            src={article?.img}
            size={200}
            className={cls.avatar}
          />
        </div>
        <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.M}
        />
        <div className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={EyeIcon} />
            <Text text={String(article?.views)} />
        </div>
        <div className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={CalendarIcon} />
            <Text text={article?.createdAt} />
        </div>
        {article?.blocks.map(renderBlock)}
      </>
    )
  }



  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
};