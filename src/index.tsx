import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { testFunction } from "./test";
import ThemeProvider from "./theme/ThemeProvider";

testFunction(123)

const root = document.getElementById('root')

render(
  <>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </>,
root)