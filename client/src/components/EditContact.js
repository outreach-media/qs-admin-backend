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
    tags: "",
    title: "",
    notes: "",
    fullName: "",
  };

  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
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
      firstName: response?.data?.content?.firstName,
      lastName: response?.data?.content?.lastName,
      tags: response?.data?.content?.tags,
      title: response?.data?.content?.title,
      notes: response?.data?.content?.notes,
    });
    // console.log("My email", this.state.email);
  };

  onSubmit = async (e) => {
    const id = this.props.match.params.id;
    const { firstName, lastName, tags, title, notes } = this.state;
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
    }
    const newContact = {
      firstName,
      lastName,
      tags,
      title,
      notes,
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

  render() {
    const { firstName, lastName, tags, title, notes } = this.state;
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
              <label>Title: </label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={title}
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Tags: </label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                value={tags}
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
              <input
                type="submit"
                value="Save"
                className="btn create-btn"
                onChange={(e) => this.onSubmit(e)}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default EditContact;
