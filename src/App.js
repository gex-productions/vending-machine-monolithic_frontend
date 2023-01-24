import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/LoginComponent";
import Seller from "./components/SellerComponent";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMinus,
  faPlus,
  faSignOut,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./components/HeaderComponent";
import Products from "./components/ProductsComponent";
import Deposit from "./components/DepositComponent";
import Footer from "./components/FooterComponent";
import { addDepositAPI, loginAPI } from "./services/UserService";
import History from "./components/HistoryComponent";

library.add(faMinus, faPlus, faSignOut, faEdit, faTrash);

function getAuth() {
  return localStorage.getItem("auth");
}

function getRole() {
  return localStorage.getItem("role");
}

function App() {
  const [auth, setAuth] = useState(getAuth());
  const role = getRole();
  const [deposit, setDeposit] = useState(0);
  const [depositError, setDepositError] = useState(deposit);

  useEffect(() => {
    if (role === "BUYER") {
      loginAPI(auth).then((response) => setDeposit(response.data.deposit));
    }
  }, [auth, role]);
  var deposit_value = (deposit / 100).toFixed(2);
  if (!auth)
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login setAuth={setAuth} setDeposit={setDeposit} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  switch (role) {
    case "SELLER":
      return (
        <div>
          <BrowserRouter>
            <Header setAuth={setAuth} />
            <Routes>
              <Route path="/products" element={<Seller />} />
              <Route exact path="/" element={<Navigate to="/products" />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      );
    default:
      return (
        <div>
          <BrowserRouter>
            <Header
              setAuth={setAuth}
              deposit={deposit_value}
              depositError={depositError}
              setDepositError={setDepositError}
            />
            <Routes>
              <Route
                path="/products"
                element={<Products setDeposit={setDeposit} />}
              />
              <Route
                path="/deposit"
                element={<Deposit deposit={deposit} setDeposit={setDeposit} />}
              />
              <Route path="/history" element={<History />} />
              <Route exact path="/" element={<Navigate to="/products" />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      );
  }
}

export default App;
