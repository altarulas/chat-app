import "./style.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContext } from "./Context/Auth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useContext } from "react";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
