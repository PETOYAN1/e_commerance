import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [IsVisible, setIsVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(false);

  useEffect(() => {
    const handleScrollButtonVisiblity = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos === 0) {
        setPrevScrollPos(false);
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
        className={`fixed bottom-2 right-2 z-[997] duration-500 ${
          IsVisible
            ? "opacity-1 visible scale-1"
            : "opacity-0 invisible scale-0"
        }`}
      >
        <Fab color="primary" sx={{ backgroundColor: '#90CAF9' }} aria-label="add" onClick={handleScrollToTop}>
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </>
  );
}
