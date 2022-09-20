import React from 'react'
import axios from 'axios'
import { TrendingCoins } from '../../config/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { CryptoState } from '../../CryptoContext';
import "./Carousel.css";
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithcomma(x){
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {
   const [ trending , setTrendingCoins] = useState([]);

    const {currency, symbol} = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrendingCoins(data);
    }

    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
            return(
            <Link to={`/coins/${coin.id}`} className="carousel-item">
                <img 
                    src={coin.image}
                    alt={coin.name}
                    height="80"
                    style={{marginBottom:10}}
                />
                <span>
                    {coin.symbol} &nbsp;
                    <span style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight:"bolder"
                    }}> {profit && "+"}{coin.price_change_percentage_24h.toFixed(2)}% </span>
                </span>
                <span className='price-style'>
                    {symbol}{numberWithcomma(coin.current_price.toFixed(2))}
                </span>
                
            </Link>
            )
        })

    const responsive ={
        0:{
            items:2
        },
        512:{
            items:4
        }
    }

  return (
    <>
    <div className = "carousel">
        <AliceCarousel
            mouseTracking
            infinite
            autoPlay
            autoPlayInterval={1000}
            animationDuration={1500}
            disableButtonsControls
            disableDotsControls
            responsive={responsive}
            items={items}     
        />
    </div>
    </>
    
  )
}

export default Carousel