import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../view/login";
import Search from "../pages/Search";
import Graphics from "../pages/Graphics";
import Test from "../pages/Test";
import Alerts from "../pages/Alerts";
import AdminView from "../pages/Admin";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/graph" element={<Graphics />} />
          <Route path="/test" element={<Test />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
