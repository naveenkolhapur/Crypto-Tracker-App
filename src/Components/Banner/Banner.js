import { Container, Typography } from '@material-ui/core'
import React from 'react'
import "./Banner.css"
import Carousel from './Carousel'

const Banner = () => {
  return (
    <>
        <div className='banner'>
        <Container className='banner-content'>
        
        <div className='tagline'>
        <Typography 
        variant='h2'
        style={{
        fontFamily:'Montserrat',
        fontWeight: 'bold',
        textShadow: '2px 2px 3px black',
        letterSpacing:'1',
        marginBottom:'15',
        }}
        >Crypto Nerds</Typography>

        <Typography
        variant='subtitle2'
        style={{
            fontFamily:'Montserrat',
            color:'darkgray',
            textTransform:'capitalize'
        }}>Get all the data with respect to your most loved digital currency.</Typography>
        </div>
        <Carousel/>
        </Container>
       
        </div>
        
    </>
  )
}

export default Banner