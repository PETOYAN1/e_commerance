// import React from 'react'
import { Container } from '@mui/material'
import SliderSwiper from './SliderSwiper/SliderSwiper'
import StackSection from './StackSection/StackSection'

const main = () => {
  return (
    <div>
      <Container sx={{ mt: 2.5, display: "flex", flexDirection: "column", alignItems: "center" }}>

        <SliderSwiper/>
        <StackSection/>
      </Container>
    </div>
  )
}

export default main