import React from "react";
import "./App.scss";

const App = () => {
  return (
    <main className="container">
      <div className="output">
        <div className="lastEntry"></div>
        <div className="currentEntry"></div>
      </div>
      <button className="spanTwo">AC</button>
      <button className="spanOne">DEL</button>
      <button className="spanOne">÷</button>
      <button className="spanOne">1</button>
      <button className="spanOne">2</button>
      <button className="spanOne">3</button>
      <button className="spanOne">*</button>
      <button className="spanOne">4</button>
      <button className="spanOne">5</button>
      <button className="spanOne">6</button>
      <button className="spanOne">+</button>
      <button className="spanOne">7</button>
      <button className="spanOne">8</button>
      <button className="spanOne">9</button>
      <button className="spanOne">.</button>
      <button className="spanOne">0</button>
      <button className="spanTwo">=</button>
    </main>
  );
};

export default App;
