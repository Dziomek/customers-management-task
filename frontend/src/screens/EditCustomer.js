import React, { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../styles/EditCustomer.css'

const EditCustomer = () => {
  const [customerId, setCustomerId] = useState(0);
  const [message, setMessage] = useState({
    content: "",
    type: "",
  });
  const [name, setName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [address, setAddress] = useState("");

  function askForEdit() {
    fetch(`/customer/ask-for-edit/${customerId}`)
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        setMessage(data);
      });
  }
  function editCustomer() {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        vatNumber: vatNumber,
        address: address,
      }),
    };
    fetch(`/customer/edit/${customerId}`, options)
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        setMessage(data);
      });
  }

  return (
    <div>
      <NavbarComponent />
      <span className="page-title">
        {message.type === 'success' || message.customerExists ? <h1>Editing customer with ID {customerId}</h1> : <h1>Edit customer</h1>}
      </span>
      {message.type === "success" || message.customerExists ? ( 
        <>
          <div id="edit-form-container">
            <Form style={{ width: "50%" }}>
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
                onClick={editCustomer}
              >
                Submit
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <>
          <span className="page-title">
            <h5>Please enter ID of the customer you want to edit</h5>
          </span>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Form style={{ width: "50%" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Client ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ID"
                  onChange={(event) => {
                    setCustomerId(event.target.value);
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => {
                  askForEdit();
                  console.log(customerId);
                }}
              >
                Submit
              </Button>
            </Form>
          </div>
        </>
      )}

      <span
        className="message-content"
        style={message.type === "fail" ? { color: "red" } : { color: "green" }}
      >
        {message.content}
      </span>
    </div>
  );
};

export default EditCustomer;
