import { Suspense } from "react"
import { Link, Route, Routes } from "react-router-dom"
import Counter from "./components/Counter"
import { classNames } from "./helpers/classNames/classNames"
import { AboutPageAsync } from "./pages/AboutPage/About.async"
import { MainPageAsync } from "./pages/MainPage/MainPage.async"
import './styles/index.scss'
import { useTheme } from "./theme/useTheme"

const App = () => {
  const {theme, toggleTheme} = useTheme()
  return (
    <>
    <div className={classNames('app', {'bbb': false}, ['aaa'])}>
      <button onClick={toggleTheme}>
        change theme
      </button>
      <Link to={'/'}>
          Main
        </Link>
        <Link to={'/about'}>
          About
        </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/"} element={<MainPageAsync/>}/>
          <Route path={"/about"} element={<AboutPageAsync/>}/>
        </Routes>
        <Counter/>
      </Suspense>
      
    </div>
    </>
  )
}

export default App