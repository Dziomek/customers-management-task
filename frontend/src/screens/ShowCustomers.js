import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import Table from "react-bootstrap/Table";
import "../styles/ShowCustomers.css";

const ShowCustomers = () => {
  const [customers, setCustomers] = useState([{}]);

  function fetchCustomers() {
    fetch("/customer/show-customers/")
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        setCustomers(data);
      });
  }

  useEffect(() => {
    fetchCustomers();
    console.log("customers fetched");
  }, []);

  return (
    <div>
      <NavbarComponent />
      <span className="page-title">
        <h1>List of customers</h1>
      </span>
      <section id="customers-section">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>VAT number</th>
              <th>Address</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {customers
              ? customers.map((customer) => {
                  return (
                    <tr>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.vat_number}</td>
                      <td>{customer.address}</td>
                      <td>{customer.created_at}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </section>
    </div>
  );
};

export default ShowCustomers;
