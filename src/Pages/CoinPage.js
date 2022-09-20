import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios'
import { SingleCoin } from '../config/api';
import { useEffect } from 'react';
import CoinInfo from '../Components/CoinInfo';
import "./coinspage.css"
import { LinearProgress, Typography } from '@material-ui/core';
import { numberWithcomma } from '../Components/Banner/Carousel';
import ReactHTMLParser from 'html-react-parser'



const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState();

  const {currency, symbol} = CryptoState();

  const fetchcoin = async() => {
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  useEffect(() => {
    fetchcoin();
  },[])

  if (!coin) return <LinearProgress style={{backgroundColor:'#486DFB'}}/>
 
  return (
    <div className="container">
      <div className="sidebar"> 
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{marginTop:20}}
        />
        <Typography variant='h3' className='heading'>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className='description'>
           {ReactHTMLParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className='marketdata'>
          <span style={{display:"flex"}}>
            <Typography
            variant='h5'
            className='heading'
            >Rank :</Typography>
            &nbsp; &nbsp;
            <Typography
            variant='h6'
            style={{fontWeight:"lighter"}}
            >
            {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{display:"flex"}}>
            <Typography
            variant='h5'
            className='heading'
            >Current Price :</Typography>
            &nbsp; &nbsp;
            <Typography
            variant='h6'
            style={{fontWeight:"lighter"}}
            >
             {symbol}
             {numberWithcomma(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>

          <span style={{display:"flex"}}>
            <Typography
            variant='h5'
            className='heading'
            >Market Cap :</Typography>
            &nbsp; &nbsp;
            <Typography
            variant='h6'
            style={{ fontWeight:"lighter"}}
            >
             {symbol}
             {numberWithcomma(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin}/>
    </div>
  );
}

export default CoinPage
