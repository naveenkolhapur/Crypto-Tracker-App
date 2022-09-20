import { Container, ThemeProvider, Typography, createTheme, TextField, TableContainer, LinearProgress, TableHead, Table, TableRow, TableCell, TableBody} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import './CoinsTable.css'
import { numberWithcomma } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(" ");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const {currency, symbol} = CryptoState();

    const fetchCoins = async () =>  {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data)
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette:{
          primary:{
            main:'#fff'
          },
          type:'dark',
        }
      });

      const handleSearch = () => {
        return coins.filter((coin) => 
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

  return (
    <>
    <ThemeProvider theme={darkTheme}>
        <Container className='coinstable-container'>
            <Typography className='coinstable-heading' variant='h4'>
            Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField
            variant='outlined'
            label="Search Coins..."
            className='searchbox'
            onChange={(e) =>setSearch(e.target.value)}
            />
            <TableContainer>
                {
                    loading ? (<LinearProgress className='linear-progress'/>) : (
                        <Table>
                            <TableHead className='table-head'>
                                <TableRow>
                                    {
                                        ["Coin", "Price", "24Change", "Market Cap"].map((head) => (
                                           <TableCell
                                                key={head}
                                                className="table-cell"
                                                align={head === "Coin" ? "" : "right"}>
                                                {head}
                                           </TableCell> 
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                    {handleSearch().slice((page-1)*10, (page -1)*10 + 10).map((row) => {
                                        const profit =row.price_change_percentage_24h > 0;
                                        return(
                                        <TableRow
                                            key={row.name}
                                            className="inner-row"
                                            onClick={() => navigate(`/coins/${row.id}`)}>  
                                            <TableCell component="th" scope='row' className='table-cell-1'>
                                                <img
                                                src={row.image}
                                                alt={row.name}
                                                height="50"
                                                style={{marginBottom : 10}}
                                                />
                                                <div className="crypto-names">
                                                    <span style={{textTransform:"uppercase" , fontSize:22, paddingLeft:10}}>{row.symbol}</span>
                                                    <span style={{color:"darkgrey", paddingLeft:10}}>{row.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell align='right'>
                                                {symbol}
                                                {numberWithcomma(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell align='right' style={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red" ,
                                                fontWeight:500
                                            }}>
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align='right'>
                                                {symbol}
                                                {numberWithcomma(row.market_cap.toString().slice(0, -6))}M
                                            </TableCell>
                                        </TableRow>
                                     
                                        )
                                    })}
                                
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <Pagination
                style={{
                    padding:20,
                    display:"flex",
                    flexDirection:"row",
                    width:"100%",
                    justifyContent:"center"
                }}
                className="pagination"
                count={(handleSearch()?.length/10).toFixed(0)}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </Container>
    </ThemeProvider>
    </>
  )
}

export default CoinsTable
