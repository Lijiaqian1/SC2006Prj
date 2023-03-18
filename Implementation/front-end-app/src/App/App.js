import './App.css';
//import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AboutUs from '../pages/AboutUs.js';
import Reviews from '../pages/Reviews.js';
import Help from '../pages/Help.js';
import Login from '../components/Login/Login.js';
import Root from '../Root.js';
import Home from '../components/Home/Home.js';
import Search from '../components/Search/Search.js';
import Maps from '../components/Maps/Maps.js';
import RegisterForm from '../components/RegisterForm/RegisterForm.js'
import RecoverPassword from '../components/RecoverPassword/RecoverPassword.js';
import EnterOTP from '../components/EnterOTP/EnterOTP.js';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword.js';
import UserDetails from '../components/UserDetails/UserDetails.js';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';
import PrivateComponent from '../components/PrivateComponent.js';
import {useState} from 'react';
import { createContext } from 'react';

/*const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
      <Route path="/" element = {<Home />}/>
      <Route path="search" element={<Search />} />
      <Route path='about' element={<AboutUs/>} />
      <Route path='help' element={<Help/>} />
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<RegisterForm />} />
      <Route path='recoverpassword' element={<RecoverPassword />} />
      <Route path='enterotp' element={<EnterOTP />} />
      <Route path='forgetpassword' element={<ForgetPassword />} />
      <Route path='userdata' element={<UserDetails />}/>
  </Route>
));*/

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
              <Route path="search" element={<Search />} />
              <Route path='userdata' element={<UserDetails />}/>
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
            <Route path='maps' element={<Maps />} />
          </Routes>
        </BrowserRouter>
      
      
    </div>


  );

}


