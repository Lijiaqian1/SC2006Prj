import './App.css';
//import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AboutUs from '../pages/AboutUs';
import Reviews from '../pages/Reviews';
import Help from '../pages/Help';
import Login from '../components/Login/Login';
import Results from '../components/Results/Results';
import Root from '../Root';
import Home from '../components/Home/Home';
import Search from '../components/Search/Search';
import RegisterForm from '../components/RegisterForm/RegisterForm'
import RecoverPassword from '../components/RecoverPassword/RecoverPassword';
import EnterOTP from '../components/EnterOTP/EnterOTP';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword';
import UserDetails from '../components/UserDetails/UserDetails';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import PrivateComponent from '../components/PrivateComponent';
import Results from '../components/Results/Results';
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
              
              <Route path='userdata' element={<UserDetails />}/>
            </Route>

            {/*Unprotected Routes*/}
            <Route path="/" element = {<Home />}/>
            <Route path='about' element={<AboutUs/>} />
            <Route path='help' element={<Help/>} />
            <Route path ='results' element={<Results/>} />
            <Route path='register' element={<RegisterForm />} />
            <Route path='login' element={<Login/>} />
            <Route path='forgetpassword' element={<ForgetPassword />} />
            <Route path='recoverpassword' element={<RecoverPassword />} />
            <Route path='enterotp' element={<EnterOTP />} />

            {/*Remember to put this routes back to protected routes*/}
            <Route path="search" element={<Search />} />
            <Route path="results" element={<Results />} />
          </Routes>
        </BrowserRouter>
      
      
    </div>


  );

}


