import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError,
} from "../actions/users";
import NewUserForm from "./NewUserForm";
import Userslist from "./UsersList";

class App extends Component {
  constructor(props) {
    super(props);

    this.props.getUsersRequest();
  }

  handleCreateUserSubmit = ({ firstName, lastName }) => {
    this.props.createUserRequest({
      firstName,
      lastName,
    });
  };

  handleDeleteUserClick = (userId) => {
    //call the delete user request REDUX action
    this.props.deleteUserRequest(userId);
  };

  handleCloseAlert = () => {
    this.props.usersError({
      error: "",
    });
  };

  render() {
    const users = this.props.users;
    return (
      <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
        <h2>Users</h2>
        <Alert
          color="danger"
          isOpen={!!this.props.users.error}
          toggle={this.handleCloseAlert}
        >
          {this.props.users.error}
        </Alert>
        <NewUserForm onSubmit={this.handleCreateUserSubmit} />
        {!!users.items && !!users.items.length && (
          <Userslist users={users} onDeleteUser={this.handleDeleteUserClick} />
        )}
      </div>
    );
  }
}
export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError,
})(App);
