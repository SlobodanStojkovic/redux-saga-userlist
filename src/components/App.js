import { Component } from "react";
import { connect } from "react-redux";
import { getUsersRequest } from "../actions/users";
import NewUserForm from "./NewUserForm";
import UserSlist from "./UsersList";

class App extends Component {
  constructor(props) {
    super(props);

    this.props.getUsersRequest();
  }

  handleSubmit = ({ firstName, lastName }) => {
    console.log(firstName, lastName);
  };

  render() {
    const users = this.props.users;
    return (
      <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
        <NewUserForm onSubmit={this.handleSubmit} />
        <UserSlist users={users} />
      </div>
    );
  }
}
export default connect(({ users }) => ({ users }), {
  getUsersRequest,
})(App);
