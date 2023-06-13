import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { dataStrore } from "./lib/state_manager/store";
import { AppNavbar } from "./components/modules/AppNavbar";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Provider store={dataStrore}>
              <Home />{" "}
            </Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
