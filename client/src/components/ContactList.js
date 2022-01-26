import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import _ from "lodash";
import "../App.css";
class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }
  componentDidMount() {
    this.getContacts();
    console.log(this.contacts ? this.contacts : "Nothing");
  }

  //get all contacts
  getContacts() {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/content-list/");
      this.setState({
        contacts: response.data.contents,
      });
    };
    fetchData();
  }
  //delete contacts
  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/content-list/" + id)
      .then((response) => {
        Swal.fire({
          title: "Success",
          text: "Contact deleted",
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 2000,
        });
        this.getContacts();
      });
  }

  //search
  filterContent(contacts, searchTerm) {
    const result = contacts.filter((contact) =>
      (contact.firstName + contact.lastName).toLowerCase().includes(searchTerm)
    );
    this.setState({ contacts: result });
  }
  handleSearch = async (e) => {
    const searchTerm = e.currentTarget.value;
    const response = await axios.get("http://localhost:5000/content-list/");
    // console.log(response.data.contact);
    this.filterContent(response.data.contacts, searchTerm);
  };

  render() {
    const { contacts } = this.state;
    return (
      <div className="container">
        <div className="table-responsive">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={this.handleSearch}
            />
          </form>

          <table
            className="table table-bordered   table-striped"
            style={{ marginTop: "100px" }}
          >
            <thead className="table__head">
              <tr className="winner__table">
                <th>S/N</th>
                <th>Winner Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>DOB</th>
                <th>Notes</th>
                <th>Custom Field</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {_.map(contacts, (contact, index) => (
                <tr key={contact._id} className="winner__table">
                  <td>{index + 1}</td>
                  <td>
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td>{contact.email}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.dateOfBirth.slice(0, 10)}</td>
                  <td>{contact.notes}</td>
                  <td>
                    {contact.customField} {contact.customValue}
                  </td>
                  <td>
                    <Link to={`/edit-contact/${contact._id}`}>
                      <FaEdit />
                    </Link>
                    &nbsp;
                    <Link to="/">
                      <BsFillTrashFill
                        color="red"
                        onClick={() => {
                          this.deleteExercise(contact._id);
                        }}
                      />
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Link
                      to={`/content-list/${contact._id}`}
                      className="text-decoration-none"
                    >
                      <button className="btn view-btn">View Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/create-contact">
          <button className="btn add-contact-btn">Add a contact</button>
        </Link>
      </div>
    );
  }
}

export default ContactList;
