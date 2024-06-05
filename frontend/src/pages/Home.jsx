import { Container } from "@mui/material";
import SliderSwiper from "../components/HomeDetails/SliderSwiper/SliderSwiper";
import StackSection from "../components/HomeDetails/StackSection/StackSection";
import Header2 from "../components/header/Header2";
import CardDetail from "../components/Card/CardDetail";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import "../assets/styles/Home.scss";
import PaginationHome from "../components/Pagination/PaginationHome";
import { TailSpin } from "react-loader-spinner";
import Footer from "../components/footer/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      await axios.get(`/products?page=${page}`).then((response) => {
        setProducts(response.data.data);
        setPageCount(response.data.last_page);
        setLoading(false);
      });
    } catch (error) {
      // setError(error.response ? error.response.data : "Server Error");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <TailSpin
        height="100"
        width="100"
        color="#0041C2"
        ariaLabel="tail-spin-loading"
        radius="0"
        wrapperStyle={{}}
        wrapperClass="homeSpinner"
        visible={true}
      />
    );
  }

  return (
    <div>
      <Header2 />
      <Container
        sx={{
          mt: 2.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SliderSwiper />
        <StackSection />
      </Container>
      <div className="product_card_container max-w-screen-xl flex flex-row flex-wrap gap-10 mx-auto items-center">
        {products.map((product) => (
          <CardDetail
            key={product.id}
            product={product}
            loadingCard={loading}
          />
        ))}
      </div>
      <PaginationHome currentPage={page} pageCount={pageCount} onPageChange={handlePageChange} />
      <Footer />

    </div>
  );
};

export default Home;
