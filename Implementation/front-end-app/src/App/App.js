import './App.css';
//import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AboutUs from '../pages/AboutUs';
import Help from '../pages/Help';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import Search from '../components/Search/Search';
import RegisterForm from '../components/RegisterForm/RegisterForm'
import RecoverPassword from '../components/RecoverPassword/RecoverPassword';
import EnterOTP from '../components/EnterOTP/EnterOTP';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword';
import UserDetails from '../components/UserDetails/UserDetails';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import PrivateComponent from '../components/PrivateComponent';
import { createContext } from 'react';
import Results from '../components/Results/Results';
import Footer from '../components/Footer/Footer';
import CalculateDistance from '../components/CalculateDistance/CalculateDistance';
import Map from '../components/Map/Map';
import Bookmarklocation from '../components/BookmarkLocation/BookmarkLocation';

export const RecoveryContext = createContext();


export default function App() {
  //const [page, setPage] = useState("login");
  //const [emails, setEmails] = useState('');
  


  return (
    <div className="App">
      
        <BrowserRouter>
          <NavigationBar />
          {/*Protected Routes*/}
          <Routes>
            <Route element={<PrivateComponent />}>
            <Route path="calculatedistance" element={<CalculateDistance />} />
            <Route path="bookmarks" element={<Bookmarklocation />} />
            <Route path="results" element={<Results />} />
            <Route path="search" element={<Search />} />

            </Route>

            {/*Unprotected Routes*/}
            <Route path="/" element = {<Home />}/>
            <Route path='about' element={<AboutUs/>} />
            <Route path='help' element={<Help/>} />
            <Route path='register' element={<RegisterForm />} />
            <Route path='login' element={<Login/>} />
            <Route path='forgetpassword' element={<ForgetPassword />} />
            <Route path='recoverpassword' element={<RecoverPassword />} />
            <Route path='enterotp' element={<EnterOTP />} />



          </Routes>
          <Footer />
        </BrowserRouter>
      
      
    </div>


  );

}


