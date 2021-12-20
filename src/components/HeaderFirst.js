import React from 'react';
import { withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if(props.location.pathname === '/') {
        title = 'Welcome'
    }
    function renderLogout() {
        const marginRight = { marginRight: "20px" };
        if((props.location.pathname === '/home') || (props.location.pathname === '/add') || (props.location.pathname === '/list')){
            return(
                <div className='row'>
                      <div className='col-10'>
                <Navbar bg="primary" variant="dark">
                <Nav className="mr-auto">
                  <Link to={"add"} className="nav-link">
                    Add Book
                  </Link>
                  <Link to={"list"} className="nav-link">
                    Book Listing
                  </Link>
                </Nav>
              </Navbar>
              </div>
              <div className='col' style={marginRight}>
              <button className="btn btn-danger"  onClick={() => handleLogout()}>
                    Logout
                  </button>
              </div>
                </div>
            )
        }
    }
    function handleLogout() {
        props.history.push('/login')
    }
    return(
        <div className="bg-primary">
            <div className="text-white p-3">
                <span className="h3 ml-4">{props.title || title}</span>
                {renderLogout()}
            </div>
        </div>
    )
}
export default withRouter(Header);