import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './components/Nav';
import BuyToken from './components/BuyToken';
import CheckDays from './components/CheckDays';
import TokenInfo from './components/TokenInfo';
function App() {
  return (
    <div className="App">
      <Nav />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route exact path="/info/:id" element={<TokenInfo />} />
            <Route exact path="/check" element={<CheckDays />} />
            <Route exact path="/buy" element={<BuyToken />} />
            <Route path="/" element={<CheckDays />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
