import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MatchingTiles from "./components/MatchingTiles/MatchingTiles";
import Jigsaw from "./components/Jigsaw/Jigsaw";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="matching-tiles" element={<MatchingTiles />} />
        <Route path="jigsaw" element={<Jigsaw />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
