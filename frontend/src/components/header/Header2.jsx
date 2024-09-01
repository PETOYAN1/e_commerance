import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import "../../assets/styles/Header2.scss";
import CardSize from "../Card/CardSize";

const Header2 = () => {
  return (
    <>
      <Container className="max-w-screen-xl mx-auto my-2">
        <div className="flex items-center justify-between">
          <Link to={"/products"} className="products_link flex items-center gap-5 text-xl p-2 rounded duration-150"
          >
            <span className="flex items-center gap-2">
              <AiFillProduct /> Products
            </span>{" "}
            <span className="product_icon">
              <FaChevronRight fontSize={12} />
            </span>
          </Link>
          <CardSize/>
        </div>
      </Container>
    </>
  );
};

export default Header2;
