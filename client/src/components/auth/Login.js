import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className='login-container bg-primary'>
      <div className='login-content'>
        <h1 className='login-title'>Login</h1>
        <form className='login-form' onSubmit={onSubmit}>
          <div className='register-input'>
            <i className='fa fa-envelope icon'></i>
            <input
              className='input-field'
              type='email'
              placeholder='Email'
              name='email'
              onChange={onChange}
              value={email}
            />
          </div>

          <div className='register-input'>
            <i className='fas fa-lock icon'></i>
            <input
              className='input-field'
              type='password'
              placeholder='Password'
              name='password'
              onChange={onChange}
              value={password}
            />
          </div>
          <div className='login-btns'>
            <button className='btn-primary btn-login' type='submit'>
              Sign In
            </button>
            <Link to='/register'>
              <button className='btn-primary btn-login btn-red'>
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
