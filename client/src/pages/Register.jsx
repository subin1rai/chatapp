import React from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { registerInfo, updateRegisterInfo, registerUser, registerError, registerLoading } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Register</h2>

            <Form.Control
              type="text"
              placeholder="Username"
              value={registerInfo.name}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })}
            />
            <Form.Control
              type="email"
              placeholder="Email"
              value={registerInfo.email}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              value={registerInfo.password}
              onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
            />
            <Button variant="primary" type="submit">
              {registerLoading ? "Creating Your Account" : "Register"}
            </Button>
            {registerError && (
              <Alert variant="danger">
                <p>{registerError.message}</p>
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
