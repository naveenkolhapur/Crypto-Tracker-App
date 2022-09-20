import { CircularProgress, createTheme, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import "./CoinInfo.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend)

const CoinInfo = ({coin}) => { 
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const {currency} = CryptoState();

  const fetchHistoricalData = async () => {
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  },[currency, days])
    
  const darkTheme = createTheme({
    palette: {
      primary:{
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <div className='chart-container'>
      {
        !historicalData ? (
          <CircularProgress
            style={{color: "#486DFB"}}
            size={250}
            thickness={1}
          />
        ):(
          <>
            <Line 
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time = date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                  : `${date.getHours()}:${date.getMinutes()}AM`;

                  return days===1 ? time : date.toLocaleDateString();               
                  }),
                  datasets : [
                    {
                      data: historicalData.map((coin) => coin[1]),
                     label: `Price (last ${days} Days) in ${currency}`,
                     borderColor:"#486DFB",                   
                    },
                  ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div className='chart-buttons'>
              {chartDays.map((day) => (
                  <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value===days}
                  >{day.label}</SelectButton>
              ))}
            </div>
          </>
        )
      }
    </div>
    </ThemeProvider>
  )
}

export default CoinInfo