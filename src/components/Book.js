import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faList, faSave} from "@fortawesome/free-solid-svg-icons";
import MyToast from "./MyToast";

export default class Book extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
    this.state.show = false;
    this.bookChange = this.bookChange.bind(this);
    this.submitBook = this.submitBook.bind(this);
  }
  initialState = { id: "", name: "", author: "", price: "", edition: "", customer: "" };

  componentDidMount() {
    const bookId = +this.props.match.params.id;
    if (bookId) {
      this.findBookById(bookId);
    }
  }

  findBookById = (bookId) => {
    axios
      .get("http://localhost:8080/book/" + bookId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            author: response.data.author,
            price: response.data.price,
            edition: response.data.edition,
            customer: response.data.customer,
          });
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  resetBook = () => {
    this.setState(() => this.initialState);
  };

  //Submit book
  submitBook = (event) => {
 /*  alert(
      "Title: " +
        this.state.name +
        ", author: " +
        this.state.author +
        ", price: " +
        this.state.price +
        ", edition: " +
        this.state.edition +
        ", customer: " +
        this.state.customer
    ); */
    event.preventDefault();

    const book = {
      name: this.state.name,
      author: this.state.author,
      price: this.state.price,
      edition: this.state.edition,
      customer: this.state.customer,
    };

    axios.post("http://localhost:8080/book", book).then((response) => {
      if (response.data != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.props.history.push("/list");
      } else {
        this.setState({ show: false });
      }
    });

    this.setState(this.initialState);
  };

  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  bookList = () => {
    return this.props.history.push("/list");
  };

  //update book using PUT
  updateBook = (event) => {

    // alert(
    //     "Id: " +
    //     this.state.id +
    //    ", Title: " +
    //     this.state.name +
    //     ", author: " +
    //     this.state.author +
    //     ", price: " +
    //     this.state.price +
    //     ", edition: " +
    //     this.state.edition +
    //     ", customer: " +
    //     this.state.customer
    // ); 
    
    event.preventDefault();

    const book = {
      id: this.state.id,
      name: this.state.name,
      author: this.state.author,
      price: this.state.price,
      edition: this.state.edition,
      customer: this.state.customer,
    };

    axios.put("http://localhost:8080/book", book).then((response) => {
      if (response.data != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
        setTimeout(() => this.bookList(), 3000);
      } else {
        this.setState({ show: false });
      }
    });

    this.setState(this.initialState);
  };

  render() {
    const { name, author, price, edition, customer } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Book was updated successfully."
                : "Book was saved successfully."
            }
            type={"success"}
          />
        </div>
        <Card className={"border"}>
          <Card.Header>
            {this.state.id ? "Update Book" : "Add New Book"}
          </Card.Header>
          <Form
            onReset={this.resetBook}
            onSubmit={this.state.id ? this.updateBook : this.submitBook}
            id="bookFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="name"
                    value={name}
                    onChange={this.bookChange}
                    placeholder="Enter Book Name"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAuthor">
                  <Form.Label>Author Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="author"
                    value={author}
                    onChange={this.bookChange}
                    placeholder="Enter Book Author"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Book Price</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="price"
                    value={price}
                    onChange={this.bookChange}
                    placeholder="Enter Book Price"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEdition">
                  <Form.Label>Book Edition</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="edition"
                    value={edition}
                    onChange={this.bookChange}
                    placeholder="Enter Book Edition"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCust">
                  <Form.Label>Customer name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="customer"
                    value={customer}
                    onChange={this.bookChange}
                    placeholder="Enter Book customer Name"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId=""></Form.Group>
              </Form.Row>

            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                {this.state.id ? "Update" : "Save"}
              </Button>
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={this.bookList.bind()}>
                Book List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
