import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const NewUserForm = ({ onSubmit }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
  });

  const handleFirstNameChange = (e) => {
    setNewUser({
      ...newUser,
      firstName: e.target.value,
    });
  };

  const handleLastNameChange = (e) => {
    setNewUser({
      ...newUser,
      lastName: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });

    setNewUser({
      firstName: "",
      lastName: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First name</Label>
        <Input
          required
          type="text"
          placeholder="First name"
          onChange={handleFirstNameChange}
          value={newUser.firstName}
        />
      </FormGroup>
      <FormGroup>
        <Label>Last name</Label>
        <Input
          required
          type="text"
          placeholder="Last name"
          onChange={handleLastNameChange}
          value={newUser.lastName}
        />
      </FormGroup>
      <FormGroup>
        <Button block outline type="submit" color="primary">
          Create
        </Button>
      </FormGroup>
    </Form>
  );
};

export default NewUserForm;
