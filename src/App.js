import "./style.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./Context/Auth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProtectedRoute from "./Context/ProtectedRoute";
import Register from "./Pages/Register";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
