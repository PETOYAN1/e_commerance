import { Container } from "@mui/material";
import SliderSwiper from "../components/HomeDetails/SliderSwiper/SliderSwiper";
import Header2 from "../components/header/Header2";
import CardDetail from "../components/Card/CardDetail";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import "../assets/styles/Home.scss";
import PaginationHome from "../components/Pagination/PaginationHome";
import { TailSpin } from "react-loader-spinner";
import Footer from "../components/footer/Footer";

const cache = {};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const productCardContainerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [page]);

  useEffect(() => {
    if (productCardContainerRef.current) {
      window.scrollTo({
        top: productCardContainerRef.current.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: 'smooth'
      });
    }
  }, [page]);

  const fetchProducts = async () => {
    if (cache[page]) {
      setProducts(cache[page].data);
      setPageCount(cache[page].last_page);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`/products?page=${page}`);
      cache[page] = response.data;  
      setProducts(response.data.data);
      setPageCount(response.data.last_page);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
        duration="0.1"
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
      {page === 1 && (
      <Container
        sx={{
          mt: 2.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SliderSwiper />
      </Container>
      )}
      <main ref={productCardContainerRef} className="product_card_container mt-10 justify-around max-w-[1440px] flex flex-row flex-wrap gap-3 mx-auto items-center">
        {products.map((product) => (
          <CardDetail
            key={product.id}
            product={product}
            loadingCard={loading}
          />
        ))}
      </main>
      <PaginationHome currentPage={page} pageCount={pageCount} onPageChange={handlePageChange} />
      <Footer />

    </div>
  );
};

export default Home;
