import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";


export default function ScrollToTop() {
  const [IsVisible, setIsVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(false);
  const matches = useMediaQuery('(max-width:1020px)');

  useEffect(() => {
    const handleScrollButtonVisiblity = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos == 0) {
        setIsVisible(false);
      } else {
        setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScrollButtonVisiblity);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisiblity);
    };
  }, [prevScrollPos]);

  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <>
      <div
        className={`${ matches ? 'bottom-[100px] left-2' : 'bottom-2 right-2' } fixed z-[997] duration-500 ${
          IsVisible
            ? "opacity-1 visible scale-1"
            : "opacity-0 invisible scale-0"
        }`}
      >
        <Fab color="primary" sx={{ backgroundColor: '#9333EA', color: '#fff' }} aria-label="add" onClick={handleScrollToTop}>
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </>
  );
}
