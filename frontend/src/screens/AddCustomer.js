import React, { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/AddCustomer.css";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState({
    content: "",
    type: "",
  });

  function submitCustomer() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        vatNumber: vatNumber,
        address: address,
      }),
    };
    console.log(name, vatNumber, address);
    fetch("/customer/add/", options)
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        setMessage(data);
      });
  }

  return (
    <div id="add-customer-container">
      <NavbarComponent />
      <span className="page-title">
        <h1>Add a customer</h1>
      </span>
      <div id="add-form-container">
        <Form id="add-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>VAT number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter VAT number"
              onChange={(event) => {
                setVatNumber(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={() => {
              submitCustomer();
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
      <span
        className="message-content"
        style={message.type === "fail" ? { color: "red" } : { color: "green" }}
      >
        {message.content}
      </span>
    </div>
  );
};

export default AddCustomer;
