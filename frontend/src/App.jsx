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
import SearchedResults from "./pages/SearchedResults";
import Basket from "./pages/Basket/Basket";
import NavbarMobileLink from "./components/Navbar_Mobile/NavbarMobileLink";
import Profile from "./pages/Profile/Profile";

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
            <NavbarMobileLink/>
            <div className="mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:slug/:id" element={<ProductDetail />} />
                <Route path="/products" element={<Products/>}/>
                <Route path="/search" element={<SearchedResults/>}/>
                <Route path="/basket" element={<Basket/>}/>
                <Route path="/profile" element={<Profile/>}/>
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
