import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage'; 

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Header />
          <Routes>
            <Route path='/' element={<HomePage/>} exact/>
            <Route path='/Coins/:id' element={<CoinPage/>} exact />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
