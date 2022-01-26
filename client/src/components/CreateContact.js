import React, { useState } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
// import validator from "validator";

const CreateContact = () => {
  // const [toggle, setToggle] = useState(false);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    tags: "",
    title: "",
    notes: "",
    fullName: "",
  });
  const { firstName, lastName, tags, title, notes } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
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
    } else if (!title) {
      Swal.fire({
        title: "Error",
        text: "Enter a title",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (!tags) {
      Swal.fire({
        title: "Error",
        text: "Put some tags",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (!notes) {
      Swal.fire({
        title: "Error",
        text: "Put some notes also",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      const newContact = {
        firstName,
        lastName,
        title,
        tags,
        notes,
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
        <h3>Create Content</h3>
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
            <label>Title: </label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={contact.title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Tags: </label>
            <input
              type="text"
              name="tags"
              className="form-control"
              value={contact.tags}
              onChange={(e) => onChange(e)}
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
              value={contact.notes}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn create-btn">
              Create Content{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
