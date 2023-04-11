import { Fragment } from "react";
import { BrowserRouter, Navigate, NavigateFunction, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/login";

function hasToken(): boolean {
  const token = localStorage.getItem('token');
  return token !== null;
}
const RoutesApp = () => {

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/home" element={
            hasToken() ? <Home/> : <Navigate to="/"/> } 
            />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;