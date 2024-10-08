import React from "react";
import "./CheckoutButton.scss";

const CheckoutButton = () => {
  return (
    <a href="#btnCheckout" className="checkout-button" id="btnCheckout">
      Checkout now!
      <figure className="truck">
        <img
          src="https://assets.codepen.io/430361/truck.svg"
          alt="Checkout animation"
        />
      </figure>
      <div className="thank-you">Thank you!</div>
      <div className="other-day">Other day text</div>
      <div className="click-run">Click run text</div>
    </a>
  );
};

export default CheckoutButton;
