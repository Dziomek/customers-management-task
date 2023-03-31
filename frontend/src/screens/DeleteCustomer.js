import React, { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const DeleteCustomer = () => {
  const [customerId, setCustomerId] = useState(0);
  const [message, setMessage] = useState({
    content: "",
    type: "",
  })

  function submitRemoval() {
    const options = {
      method: "DELETE",
    };
    fetch(`/customer/delete/${customerId}`, options)
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then(data => {
        setMessage(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <NavbarComponent />
      <span className="page-title">
        <h1>Delete customer</h1>
      </span>
      <span className="page-title">
        <h5>Please enter ID of the customer you want to delete</h5>
      </span>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
          <Button variant="primary" onClick={() => {
            console.log(customerId)
            submitRemoval()}}>
            Submit
          </Button>
        </Form>
      </div>
      <span class='message-content' style={message.type === 'fail' ? {color: 'red'} : {color: 'green'}}>{message.content}</span>
    </div>
  );
};

export default DeleteCustomer;
