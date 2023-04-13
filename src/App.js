import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { loadUser } from "./actions/auth";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Multimedia from "./pages/Multimedia";
import setAuthInHeader from "./utils/setAuthInHeader";
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.getItem("jwt-token")) {
  setAuthInHeader(localStorage.getItem("jwt-token"));
}
function App() {
  useEffect(() => {
    console.log('first')
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Navbar />
        {/* <Home /> */}
        {console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_URL)}
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        {/* <section className='container'> */}
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Register />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/multimedia" element={<Multimedia />} />
            <Route exact path="/multimedia/:id" element={<Multimedia />} />
          </Routes>
        {/* </section> */}
        </Router>
      </Provider>
    </div>
  );
}

export default App;
