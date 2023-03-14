import './App.css';
//import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AboutUs from '../pages/AboutUs';
import Reviews from '../pages/Reviews';
import Help from '../pages/Help';
import Login from '../components/Login/Login';
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


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />

        {/*Protected Routes*/}
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="search" element={<Search />} />
            <Route path='recoverpassword' element={<RecoverPassword />} />
            <Route path='enterotp' element={<EnterOTP />} />
            <Route path='forgetpassword' element={<ForgetPassword />} />
            <Route path='userdata' element={<UserDetails />}/>
          </Route>

          {/*Unprotected Routes*/}
          <Route path="/" element = {<Home />}/>
          <Route path='about' element={<AboutUs/>} />
          <Route path='help' element={<Help/>} />
          <Route path='register' element={<RegisterForm />} />
          <Route path='login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>


  );

}


