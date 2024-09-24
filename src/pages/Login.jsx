import { Form, Input, Checkbox, Button, message } from "antd";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { auth, provider } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../store/auth/actions/auth.actions";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const handleAuthGoogle = () => {
    dispatch(loginRequest());
    signInWithPopup(auth, provider).then((data) => {
      dispatch(loginSuccess(data.user));
      message.success("Đăng Nhập Thành Công Với Google");
    });
  };

  const onFinish = (values) => {
    dispatch(loginRequest());
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(loginSuccess(user));
        message.success("Đăng Nhập Thành Công");
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
        message.error(`${error.message}`);
      });
  };

  return (
    <div className="login-container-form">
      <h1 className="text-center">Login</h1>
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
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            size="large"
            type="email"
            placeholder="Email"
          />
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
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            size="large"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link to={'/register'} className="login-form-forgot">Chưa Có Tài Khoản, Register?</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or
          <Button
            type="primary"
            className="login-form-button"
            danger
            onClick={handleAuthGoogle}
          >
            Đăng Nhập Với Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
