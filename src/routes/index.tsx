import { Fragment } from "react";
import { BrowserRouter, Navigate, NavigateFunction, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/login";
import Search from "../pages/Search";
import Graphics from "../pages/Graphics";
import Test from "../pages/Test";

function hasToken(): boolean {
  const token = localStorage.getItem('token');
  if(token == null){
    return false
  }
  return true
}
const RoutesApp = () => {

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/home" element={
            hasToken() ? <Home/> : <Navigate to="/"/> } 
            />
          <Route path="/search" element={
            hasToken() ? <Search/> : <Navigate to="/"/> } 
            />
          <Route path="/graph" element={
            hasToken() ? <Graphics/> : <Navigate to="/"/> } 
            />
          <Route path="/test" element={
            hasToken() ? <Test/> : <Navigate to="/"/> } 
            />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;