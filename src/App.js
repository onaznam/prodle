import { Route, Routes } from "react-router-dom";
import Board from "./Board";
import Landing from "./Landing";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { GlobalStyle } from "./Styles";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/board" element={<Board />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
