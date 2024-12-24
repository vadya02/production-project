import { Theme, useTheme } from "app/providers/ThemeProvider";
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import { classNames } from "shared/lib/classNames";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({className}: ThemeSwitcherProps) {
  const {theme, toggleTheme} = useTheme()
  return (
    <Button theme={ThemeButton.CLEAR} onClick={toggleTheme} className={classNames(cls.ThemeSwitcher, {}, [className])}>
      {theme === Theme.DARK ? <DarkIcon/> : <LightIcon/>}
    </Button>
  )
}
