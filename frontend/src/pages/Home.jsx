import { Container, Stack } from '@mui/material'
import SliderSwiper from '../components/HomeDetails/SliderSwiper/SliderSwiper'
import StackSection from '../components/HomeDetails/StackSection/StackSection'
import Header2 from '../components/header/Header2'
import CardDetail from '../components/Card/CardDetail'
import { useEffect, useState } from 'react'
import axios from '../api/axios'
import PaginationHome from '../components/Pagination/PaginationHome'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState(null)

  console.log(error);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/products?page=${page}`);
        setProducts(response.data.data);
        setPageCount(response.data.last_page);
      } catch (error) {
        setError(error.response ? error.response.data : "Server Error");
      }
    };

    fetchProducts();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Header2/>
      <Container sx={{ mt: 2.5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SliderSwiper/>
        <StackSection/>
      </Container>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        sx={{ mx: 5 }}
      >
        {products.map((product) => (
          <CardDetail key={product.id} product={product} />
        ))}
      </Stack>
      <PaginationHome pageCount={pageCount} onPageChange={handlePageChange}/>
    </div>
  )
}


export default Home