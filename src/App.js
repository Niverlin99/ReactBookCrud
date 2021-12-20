import React, {useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import { Container, Row, Col } from "react-bootstrap";
import Book from "./components/Book";
import BookList from "./components/BookList";
import Header from "./components/Header";
import HeaderFirst from "./components/HeaderFirst";
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AlertComponent from './components/AlertComponent';  

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const marginTop = { marginTop: "20px" };
  
  return (
    <Router>
     <Header />
   <HeaderFirst title={title}/>
      <Container>
        <Row>
        <Col lg={12} style={marginTop}>
        <Switch>
        <Route path="/" exact={true}>
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
               <Route path="/home" exact component={Welcome} />
              <Route path="/add" exact component={Book} />
              <Route path="/edit/:id" exact component={Book} />
              <Route path="/list" exact component={BookList} />
            </Switch>
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
