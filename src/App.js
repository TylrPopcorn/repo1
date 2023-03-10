import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "../styles/styles.css";

import Login from "./components/Login"; //Login page.
import Wheel from "./components/Wheel"; //Main page.

const module = {
  //Extra helpers to this file.
  Error_Active: false, //Debounce.
};
//---------
//Main function:
function App() {
  const [error, setError] = useState("");
  const navigate = useNavigate(); //Used to redirect the user.

  function ERROR(msg) {
    //Debounce
    if (module.Error_Active === false) {
      module.Error_Active = true; //activate the debounce.

      //Used to show any errors (if necessary.)
      setError(msg); //Update the state to show the error.

      setTimeout(() => {
        //After some time,
        setError(""); //clear the error
        module.Error_Active = false; //turn off the debounce
      }, 3015);
    }
  }

  function Logout() {
    //When loggin out
    localStorage.removeItem("token"); //remve the token from storage
    navigate("/"); //Redicrect the user to the homepage
  }

  return (
    //html
    <div className="full-screen-container">
      <button id="logout" onClick={Logout}>
        Logout
      </button>
      <h1 className="title">The Wheel</h1> {/* Title */}
      <p id="error">{error}</p>
      <Routes>
        {/* Routes */}
        <Route path="/" element={<Login navigate={navigate} Error={ERROR} />} />

        <Route exact path="wheel" element={<Wheel navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default App;
