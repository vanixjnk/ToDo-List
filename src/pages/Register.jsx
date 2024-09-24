import { Form, Input, Button, message } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  registerFailure,
  registerSuccess,
} from "../store/auth/actions/auth.actions";
import { useDispatch } from "react-redux";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";
const Register = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(registerSuccess(user));
        message.success("Đăng Nhập Thành Công");
      })
      .catch((error) => {
        dispatch(registerFailure(error.message));
        message.error(`${error.message}`);
      });
  };
  return (
    <div className="login-container-form">
      <h1 className="text-center">Register</h1>
      <Form
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password type="password" size="large" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
        <Link to={"/login"} className="login-form-forgot">
          Đã Có Tài Khoản? Login
        </Link>
      </Form>
    </div>
  );
};

export default Register;
