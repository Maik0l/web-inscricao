import "./App.css";
import FormPage from "./components/FormPage";
import MainPage from "./components/MainPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/form" Component={FormPage} />
      </Routes>
    </>
  );
}

export default App;
