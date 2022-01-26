import React, { Component } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

class EditContact extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    notes: "",
    customField: "",
    customValue: "",
    dateOfBirth: new Date(),
    toggle: false,
  };

  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  toggleChange = () => {
    const newToggle = !this.state.toggle;
    this.setState({ toggle: newToggle });
  };

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    const id = this.props.match.params.id;
    const response = await axios.get(
      `http://localhost:5000/content-list/${id}`
    );
    this.setState({
      firstName: response.data.contact.firstName,
      lastName: response.data.contact.lastName,
      email: response.data.contact.email,
      phoneNumber: response.data.contact.phoneNumber,
      notes: response.data.contact.notes,
      customField: response.data.contact.customField,
      customValue: response.data.contact.customValue,
      dateOfBirth: response.data.contact.dateOfBirth,
    });
    // console.log("My email", this.state.email);
  };

  onSubmit = async (e) => {
    const id = this.props.match.params.id;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      notes,
      customField,
      customValue,
      dateOfBirth,
    } = this.state;
    e.preventDefault();
    if (!firstName) {
      Swal.fire({
        title: "Error",
        text: "You forgot first name, It is mandatory",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (!lastName) {
      Swal.fire({
        title: "Error",
        text: "You forgot last name, It is mandatory",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (!email) {
      Swal.fire({
        title: "Error",
        text: "You forgot email id, It is mandatory",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (!phoneNumber) {
      Swal.fire({
        title: "Error",
        text: "You forgot phone number, It is mandatory",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    const newContact = {
      firstName,
      lastName,
      email,
      phoneNumber,
      notes,
      customField,
      customValue,
      dateOfBirth,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newContact);
      const response = await axios.put(
        `http://localhost:5000/contact-list/${id}`,
        body,
        config
      );
      console.log(response);
      Swal.fire({
        title: "Success",
        text: "Contact successfully updated",
        icon: "success",
        position: "center",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        window.location = "/";
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  //   onChangeDates = (date) => {
  //     setContact({
  //       date,
  //     });
  //   };
  render() {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      notes,
      //   dateOfBirth,
      customField,
      customValue,
      toggle,
    } = this.state;
    return (
      <div>
        <div className="container mt-5 mb-5">
          <Link to="/">
            <p>Back to Home</p>
          </Link>
          <h3>Edit Contacts</h3>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <div className="form-group">
              <label>Firstname: </label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Lastname: </label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Phone Number: </label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Notes: </label>
              <textarea
                rows="4"
                cols="155"
                type="text"
                name="notes"
                className="form-control"
                value={notes}
                onChange={(e) => this.onChange(e)}
              />
            </div>

            <div className="form-group">
              {" "}
              <div
                className="btn create-btn"
                style={{ color: "white" }}
                onClick={this.toggleChange}
              >
                Add field
              </div>
            </div>

            {toggle ? (
              <div className="form-group">
                <div className="custom-field">
                  <input
                    type="text"
                    name="customField"
                    className="form-control"
                    placeholder="Field name"
                    value={customField}
                    onChange={(e) => this.onChange(e)}
                  />
                  <input
                    type="text"
                    name="customValue"
                    className="form-control custom-value"
                    value={customValue}
                    placeholder="Value"
                    onChange={(e) => this.onChange(e)}
                  />
                </div>
              </div>
            ) : null}

            <div className="form-group">
              <input type="submit" value="Save" className="btn create-btn" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default EditContact;
