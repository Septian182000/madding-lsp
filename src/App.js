import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { dataStrore } from "./lib/state_manager/store";
import { AppNavbar } from "./components/modules/AppNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
  });

  if (user.username !== "") {
    sessionStorage.setItem("role", user.username);
    sessionStorage.setItem("role_name", user.name);
  }

  const logged = sessionStorage.getItem("role");
  const loggedName = sessionStorage.getItem("role_name");

  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Provider store={dataStrore}>
              <Home logged={logged} user={loggedName} />
            </Provider>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/100101001"
          exact
          element={
            <Provider store={dataStrore}>
              <Login setUser={setUser} user={user} />
            </Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
