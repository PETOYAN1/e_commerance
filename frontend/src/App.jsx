import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Outlet } from "react-router-dom";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ScrollToTop from "./components/scroll/ScrollToTop";
import Products from "./components/All_products/Products";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div className="App min-h-screen">
            <Navigation />
            <CssBaseline />
            <ScrollToTop />

            <div className="mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:slug/:id" element={<ProductDetail />} />
                <Route path="/products" element={<Products/>}/>
              </Routes>
            </div>
            <Outlet />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
