import './App.css';
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import AboutUs from '../pages/AboutUs';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Reviews from '../pages/Reviews';
import Help from '../pages/Help';
import Login from '../pages/Login';
import RegisterForm from '../components/RegisterForm/RegisterForm'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<NavigationBar/>}>
      <Route path='/reviews' element={<Reviews/>} />
      <Route path='/about' element={<AboutUs/>} />
      <Route path='/help' element={<Help/>} />
      <Route path='/Login' element={<Login/>} />
      <Route path='/register' element={<RegisterForm />} />
  </Route>

));
export default function App() {
  return (
    <RouterProvider router={router} />


  );

}


