import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import CreateContact from "./components/CreateContact";
import EditContact from "./components/EditContact";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ContactList} />
          <Route exact path="/content-list/:id" component={ContactDetails} />
          <Route exact path="/create-contact" component={CreateContact} />
          <Route exact path="/edit-contact/:id" component={EditContact} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
