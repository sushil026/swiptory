import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import CatagoryPanel from "./components/CategoryPanel/CategoryPanel";

function App() {
  return (
    <div className="App" style={{height: '100vh', width: '100%'}}>
      <Navbar/>
      <CatagoryPanel/>
    </div>
  );
}

export default App;
