import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import "../../assets/styles/Header2.scss";

const Header2 = () => {
  return (
    <>
      <Container className="max-w-screen-xl mx-auto my-2">
        <div className="flex items-center ">
          <Link to={"/products"} className="products_link flex items-center gap-5 text-xl p-2 rounded duration-150"
          >
            <span className="flex items-center gap-2">
              <AiFillProduct /> Products
            </span>{" "}
            <span className="product_icon">
              <FaChevronRight fontSize={12} />
            </span>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Header2;
