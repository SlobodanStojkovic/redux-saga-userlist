import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "reactstrap";
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError,
} from "../actions/users";
import NewUserForm from "./NewUserForm";
import Userslist from "./UsersList";

const App = () => {
  const [users, setUsers] = useState([]);
  const redcerData = useSelector((state) => {
    return state.users;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setUsers(redcerData);
  }, [redcerData]);

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const handleCreateUserSubmit = ({ firstName, lastName }) => {
    createUserRequest({
      firstName,
      lastName,
    });
  };

  const handleDeleteUserClick = (userId) => {
    deleteUserRequest(userId);
  };

  const handleCloseAlert = () => {
    usersError({
      error: "",
    });
  };

  return (
    <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
      <h2>Users</h2>
      <Alert color="danger" isOpen={!!users.error} toggle={handleCloseAlert}>
        {users.error}
      </Alert>
      <NewUserForm onSubmit={handleCreateUserSubmit} />
      {!!users.items && !!users.items.length && (
        <Userslist users={users} onDeleteUser={handleDeleteUserClick} />
      )}
    </div>
  );
};

export default App;
