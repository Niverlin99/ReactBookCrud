import React, { Component } from "react";
import logo from "./library-books.jpg";
import './AlertComponent.css';  

export default class Header extends Component {
  render() {
    return (
      <header className="row">
        <div className="col-md-5">
          <img
            src={logo}
            className="logo"
            alt="logo"
            height="100px"
            width="500px"
          />
        </div>
        <div className="col-md-7 mt-2 text-white subtitle font-size-45" >Book Management System</div>
      </header>
    );
  }
}
