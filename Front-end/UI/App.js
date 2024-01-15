//import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './component/Home';
import BasicForm from './component/LoginForm';
import RideBookingForm from './component/ProductPage';
import RegistrationForm from './component/RegistrationForm';
import PasswordChangeForm from './component/PasswordChange';
import { useSelector } from 'react-redux';
import LogoutForm from './component/LogoutForm';
import TripInfo from './component/TripInfo';
import AboutUs from './component/AboutUs';
import ReviewT from './component/Review';

function App() {

  const mystate = useSelector(state=> state.logged)


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

        {/* <Navbar/> */}

        {/* <PasswordChangeForm/> */}

        {/* <div style={{display: mystate.loggedIn?"none":"block"}}>
      <ul className="nav navbar">
            <li className="nav-item">
                <Link to="/registration" className="nav-link">REGISTER</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">LOGIN</Link>
            </li>
      </ul>
      </div> */}
{/* 
        {!mystate.logged && (
          <div style={{ display: 'block' }}>
            <ul className="nav navbar">
              <li className="nav-item">
                <Link to="/registration" className="nav-link">REGISTER</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">LOGIN</Link>
              </li>
            </ul>
          </div>
        )} */}
        
        

        <Routes>
          <Route path='/' element={<BasicForm/>} />
          <Route path='/home' element={<Navbar/>} />
          <Route path='/login' element={<BasicForm/>} />
          <Route path='/logout' element={<LogoutForm/>} />
          <Route path='/registration' element={<RegistrationForm/>} />
          <Route path='/forgotPassword' element={<PasswordChangeForm/>} />
          <Route path='/booking' element={<RideBookingForm/>}/>
          <Route path='/tripinfo' element={<TripInfo/>} />
          <Route path='/aboutUs' element={<AboutUs/>} />
          <Route path='/review' element={<ReviewT/>} />

        </Routes>


      </header>
    </div>
  );
}

export default App;
