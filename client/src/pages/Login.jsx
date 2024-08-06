import React, { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginUser, loginError, loginInfo, loginLoading, updateLoginInfo } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Login</h2>
            <Form.Control
              type="email"
              placeholder="Email"
              value={loginInfo.email}
              onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
            />
            <Button variant="primary" type="submit">
              {loginLoading ? "Logging in..." : "Login"}
            </Button>
            {loginError && (
              <Alert variant="danger">
                <p>{loginError.message}</p>
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
