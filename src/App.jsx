import { Routes, Route, Link } from "react-router-dom";
import Weather from "./pages/Weather";
import "./App.css";

function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/weather">Погода</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;