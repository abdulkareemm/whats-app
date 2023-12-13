import "./App.css";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import {Login,Home,Register} from "./pages"
function App() {
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
