import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

function logout(setAuth) {
  localStorage.removeItem("auth");
  localStorage.removeItem("role");
  setAuth(undefined);
}

function Header({ setAuth, deposit }) {
  const [navOpen, setNavOpen] = useState(false);
  const isBuyer = localStorage.getItem("role") === "BUYER";
  return (
    <Navbar color={"dark"} dark expand="md">
      <NavbarBrand href="/">Vending Machine</NavbarBrand>

      <NavbarToggler onClick={() => setNavOpen(!navOpen)} />
      <Collapse isOpen={navOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink className="nav-link" to="/products">
              <span className="fa fa-home fa-lg"></span> Products
            </NavLink>
          </NavItem>
          {isBuyer && (
            <NavItem>
              <NavLink className="nav-link" to="/deposit">
                <span className="fa fa-info fa-lg"></span> Deposit
              </NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink className="nav-link" to="/history">
              <span className="fa fa-info fa-lg"></span> History
            </NavLink>
          </NavItem>
          {isBuyer && (
            <NavItem>
              <NavLink className="nav-link">
                <strong>${deposit}</strong>
              </NavLink>
            </NavItem>
          )}
        </Nav>
        <Button
          className="ms-auto"
          color="danger"
          onClick={() => logout(setAuth)}
        >
          <FontAwesomeIcon icon={"sign-out"} /> Log out
        </Button>
      </Collapse>
    </Navbar>
  );
}
export default Header;
