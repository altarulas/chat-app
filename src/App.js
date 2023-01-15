import "./style.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppProtection } from "./Context/ProtectedRoute";
import AppScreen from "./Pages/AppScreen";
import { AuthContextProvider } from "./Context/Auth";
import { ChatContextProvider } from "./Context/Chat";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppProtection />}>
              <Route path="/app-screen" element={<AppScreen />} />
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
