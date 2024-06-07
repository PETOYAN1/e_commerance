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

  const pictureUrl = categoryData?.picture ?? "/src/assets/images/no-image.jpg";

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
  const theme = useTheme();
  return (
    <>
      <nav
        className={`navbar ${showMenu ? "open" : ""} ${isScrolled ? "fixed top-[70px] min-h-screen" : ""} flex`}
        style={{ backgroundColor: theme.palette.myColor.main }}
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
                  <li className="nav_menu_link_li" onClick={handleMenuClose}>
                    <Link to={`/category/${category.slug}/${category.id}`} className="nav_link">
                      {category.name}
                      {category.children.length > 0 && (
                        <KeyboardArrowRightIcon />
                      )}
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        {subMenuOpen && subMenuData && (
          <div className="flex w-full h-100 bg-black relative">
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
                    </Link>
                  </li>
                ))}
              </ul>

              <div
                className="category_image_container min-h-screen"
                style={{ backgroundColor: theme.palette.myColor.main }}
              >
                <Link
                  to={`/category/${categoryData.slug}/${categoryData.id}`}
                >
                  <div className="category_img_box">
                    <img src={pictureUrl} alt="" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
