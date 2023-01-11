import "./style.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./Context/Auth";
import { ChatContextProvider } from "./Context/Chat";
import Home from "./Pages/Home";
import { HomeProtection } from "./Context/ProtectedRoute";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<HomeProtection />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
