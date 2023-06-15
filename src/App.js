import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { dataStrore } from "./lib/state_manager/store";
import { AppNavbar } from "./components/modules/AppNavbar";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "./pages/Login";
import About from "./pages/About";

function App() {
  const [user, setUser] = useState({
    id: "",
    username: "",
    name: "",
    password: "",
  });
  const [totalComment, setTotalComment] = useState();

  if (user.username !== "") {
    sessionStorage.setItem("id_admin", user.id);
    sessionStorage.setItem("role", user.username);
    sessionStorage.setItem("role_name", user.name);
  }

  const logged = sessionStorage.getItem("role");
  const loggedName = sessionStorage.getItem("role_name");
  const loggedID = sessionStorage.getItem("id_admin");

  const url = window.location.href;
  const parameter = url.substring(url.lastIndexOf("/") + 1);

  return (
    <BrowserRouter>
      {parameter === "100101001" ? "" : <AppNavbar />}

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Provider store={dataStrore}>
              <Home logged={logged} user={loggedName} userID={loggedID} />
            </Provider>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/article-detail/:idArticle"
          exact
          element={
            <Provider store={dataStrore}>
              <ArticleDetail logged={logged} />
            </Provider>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/about"
          exact
          element={
            <Provider store={dataStrore}>
              <About />
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
              <Login setUser={setUser} user={logged} />
            </Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
