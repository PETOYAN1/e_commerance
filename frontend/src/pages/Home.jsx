import { Container, Stack } from '@mui/material'
import SliderSwiper from '../components/HomeDetails/SliderSwiper/SliderSwiper'
import StackSection from '../components/HomeDetails/StackSection/StackSection'
import Header2 from '../components/header/Header2'
import CardDetail from '../components/Card/CardDetail'

const Home = () => {
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
        <CardDetail/>
        <CardDetail/>
        <CardDetail/>
        <CardDetail/>
        <CardDetail/>
      </Stack>
    </div>
  )
}


export default Home