import React from "react";
import CardComponent from "../components/CardComponent";
import NavbarComponent from "../components/NavbarComponent";
import "../styles/Home.css";

function Home() {
  return (
    <div id="home-container">
      <NavbarComponent />
      <span className="page-title">
        <h1>Welcome to customers management page</h1>
      </span>
      <section id="cards-section">
        <CardComponent
          className="home-card"
          title="ADD a customer"
          subtitle="Here you can add a new customer"
          buttonSubtitle="Add"
          link="/add"
        />
        <CardComponent
          className="home-card"
          title="DELETE customer"
          subtitle="Here you can delete customer"
          buttonSubtitle="Delete"
          link="/delete"
        />
        <CardComponent
          className="home-card"
          title="EDIT customer"
          subtitle="Here you can edit customer"
          buttonSubtitle="Edit"
          link="/edit"
        />
        <CardComponent
          className="home-card"
          title="SHOW customers list"
          subtitle="Displays list of customers"
          buttonSubtitle="Show"
          link="/customers"
        />
      </section>
    </div>
  );
}

export default Home;
