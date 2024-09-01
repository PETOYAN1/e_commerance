import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/NavBarMenu.scss";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

export default function navBarMenu({ categories, showMenu, setMenuOpen, isScrolled }) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subMenuData, setSubMenuData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const theme = useTheme();
  const navbarHeight = `calc(100vh - 144px + ${scrollPosition}px)`;

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    if (showMenu) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [showMenu]);


  const handleOpenSubMenu = (category) => {
    setSubMenuData(category.children);
    setCategoryData(category);
    setSubMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(!setMenuOpen);
    setSubMenuOpen(true);
    setSubMenuData(null);
    setCategoryData(null);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    <>
      <nav
        className={`navbar ${showMenu ? "open" : ""}  : ""} flex`}
        style={{ backgroundColor: theme.palette.myColor.main, minHeight: navbarHeight, position: navbarHeight > '142px' ? 'fixed' : 'absolute' }}
      >
        <div className="menu_container">
          <Box sx={{ margin: "5px" }}>
            <IconButton onClick={handleMenuClose}>
              <Close />
            </IconButton>
          </Box>
          <div className="mt-10 flex flex-col">
            <ul className="nav_menu_ul">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onMouseEnter={() => handleOpenSubMenu(category)}
                >
                  <li className="nav_menu_link_li nav_link">
                    {category.name}
                    {category.children.length > 0 && (
                      <KeyboardArrowRightIcon />
                    )}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        {subMenuOpen && subMenuData && (
          <div className="flex w-full h-100 bg-black relative" style={{ minHeight: navbarHeight }}>
            <div className="sub_menu_container min-h-screen">
              <ul
                className="sub_menu_ul min-h-screen"
                style={{ backgroundColor: theme.palette.myColor.main }}
              >
                <h2 className="font-bold mb-4">{categoryData.name}</h2>
                {subMenuData.map((subCategory) => (
                  <li key={subCategory.id} className="sub_menu_link_li" onClick={handleMenuClose}>
                    <Link
                      to={`/category/${subCategory.slug}/${subCategory.id}`}
                      className="sub_link"
                    >
                      {subCategory.name}
                      <span>{subCategory.products_count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
