import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

import useInterval from "../hooks/use-interval.hook";

import { GameContext } from './GameContext';

function App() {
  const { numCookies, setNumCookies, purchasedItems, cookiesPerSecond } = useContext(GameContext);
  
  useInterval(() => {
    setNumCookies(numCookies + cookiesPerSecond);
  }, 1000);

  window.onunload = window.onbeforeunload = () => {
    if (purchasedItems.cursor > 0 || purchasedItems.grandma > 0 || purchasedItems.farm > 0) {
      const oldTime = JSON.stringify(Date.now());
      localStorage.setItem('timeClosed', oldTime);
  }}

  window.onload = () => {
    if (localStorage.getItem('timeClosed') !== null) {
      const timeClosed = JSON.parse(localStorage.getItem('timeClosed'));
      const newTime = Date.now();
      const diffInSeconds = Math.floor((newTime - timeClosed) / 1000);
      const cookiesGeneratedWhileClosed = cookiesPerSecond * diffInSeconds;
      setNumCookies(numCookies + cookiesGeneratedWhileClosed);
    }
  }

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
