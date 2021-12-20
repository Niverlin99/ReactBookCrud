import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

export default class Welcome extends Component {

  render() {
    return (
      <Jumbotron className="bg-dark text-white">
        <h1> Welcome to the Book Management System</h1>
        <blockquote className="blockquote mb-O">
        </blockquote>
      </Jumbotron>
    );
  }
}
