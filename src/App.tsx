import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Trending from "./pages/Trending/Trending";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Trending />} />
      </Routes>
      <h1>Movie Galaxy</h1>
    </Router>
  );
}

export default App;
