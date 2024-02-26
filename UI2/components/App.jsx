import React from "react";
import ReactDOM from "react-dom/client";
import {
  HashRouter, Navigate, Route, Routes,
} from "react-router-dom";

import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeDetails from "./EmployeeDetails.jsx";
import EmployeeDirectory from "./EmployeeDirectory.jsx";
import EmployeeRetirement from "./EmployeeRetirement.jsx";
import Navbar from "./Navbar.jsx";


export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Navbar />
          {/* <EmployeeDirectory /> */}
          <Routes>
            <Route path="/" element={<Navigate replace to="/directory" />} />
            {/* <Navigate exact from="/" to="/directory" /> */}
            <Route path="/directory" element={<EmployeeDirectory />} />
            <Route path="/empCreate" element={<EmployeeCreate />} />
            <Route path="/empEdit" element={<EmployeeDetails />} />
            <Route path="/empRetirement" element={<EmployeeRetirement />} /> 
          </Routes>
        </div>
      </HashRouter>
    );
  }
}

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
root.render(<App />);
