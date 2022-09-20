import React from 'react'
import './Header.css'
import {useNavigate} from 'react-router-dom'
import {AppBar, Container, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider} from "@material-ui/core"; 
import { CryptoState } from '../CryptoContext';

const Header = () => {
  const darkTheme = createTheme({
    palette:{
      primary:{
        main:'#fff'
      },
      type:'dark',
    }
  });
  const navigate = useNavigate();

  const {currency, setCurrency} = CryptoState();
  console.log(currency);
  return (
   <>
   <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static">
      <Container>
      <Toolbar>
        <Typography onClick={() => {
          navigate("/")
        }} className="title" variant='h6'> 
          Crypto Nerds
        </Typography>
        <Select variant='outlined' style={{
          height:40,
          width:100,
          marginRight:15,
        }}
        value={currency}
        onChange= {(e) => setCurrency(e.target.value)}
        >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"INR"}>INR</MenuItem>
        </Select>
      </Toolbar>

      </Container>
    </AppBar>
    </ThemeProvider>
   </>
  )
}

export default Header
