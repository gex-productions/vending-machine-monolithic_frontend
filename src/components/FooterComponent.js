import React from "react";

export default function Footer() {
  return (
    <footer className="mt-2 bg-light text-center text-lg-start">
      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <br />
        <a className="text-dark">Vending Machine</a>
      </div>
      {/* Copyright */}
    </footer>
  );
}
