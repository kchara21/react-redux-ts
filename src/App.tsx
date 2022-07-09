import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import CrudApi from "./components/CrudApi";
import ShoppingCart from "./components/ShoppingCart";
import store from "./store/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <h1>REDUX</h1>
        {/* <ShoppingCart /> */}
        <CrudApi/>
      </Provider>
    </div>
  );
}

export default App;
