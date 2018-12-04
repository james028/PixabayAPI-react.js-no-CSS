import React, { Component } from "react";
import Navbar from "./components/navbar";
import Search from "./components/search";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Search />
      </div>
    );
  }
}

export default App;
