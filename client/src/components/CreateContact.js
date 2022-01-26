import React, { useState } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import validator from "validator";

const CreateContact = () => {
  const [toggle, setToggle] = useState(false);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    notes: "",
    customField: "",
    customValue: "",
    dateOfBirth: "",
    fullName: "",
  });
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    notes,
    customField,
    customValue,
    dateOfBirth,
  } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const toggleChange = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
  };
  const onSubmit = async (e) => {
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
    } else if (validator.isEmail(email) === false) {
      Swal.fire({
        title: "Error",
        text: "Invalid mail id",
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
    } else if (phoneNumber.length > 11) {
      Swal.fire({
        title: "Error",
        text: "Mobile number length should be of 11 numbers maximum",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (!dateOfBirth) {
      Swal.fire({
        title: "Error",
        text: "Please provide date of birth",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (validator.isMobilePhone(phoneNumber) === false) {
      Swal.fire({
        title: "Error",
        text: "Invalid Input, please enter valid number",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
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
        await axios.post("http://localhost:5000/content-list/", body, config);

        Swal.fire({
          title: "Success",
          text: "Contact successfully created",
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => {
          window.location = "/";
        }, 1000);
      } catch (err) {
        if (err.response.data.status === "Error") {
          Swal.fire({
            title: "Error",
            text: "Email or phone number already exists",
            icon: "error",
            position: "center",
            showConfirmButton: false,
            timer: 3000,
          });
        }
        console.log("Err", err.response.data.status);
      }
    }
  };

  return (
    <div>
      <div className="container mt-5 mb-5">
        <Link to="/">
          <p>Back to Home</p>
        </Link>
        <h3>Create Contacts</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label>Firstname: </label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={contact.firstName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Lastname: </label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={contact.lastName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={contact.email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Phone Number: </label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              value={contact.phoneNumber}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <input
                type="date"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Notes: </label>
            <textarea
              rows="4"
              cols="155"
              type="text"
              name="notes"
              className="form-control"
              value={contact.notes}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group">
            {" "}
            <div
              className="btn create-btn"
              style={{ color: "white" }}
              onClick={toggleChange}
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
                  value={contact.customField}
                  onChange={(e) => onChange(e)}
                />
                <input
                  type="text"
                  name="customValue"
                  className="form-control custom-value"
                  value={contact.customValue}
                  placeholder="Value"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
          ) : null}

          <div className="form-group">
            <button type="submit" className="btn create-btn">
              Create Contact{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
