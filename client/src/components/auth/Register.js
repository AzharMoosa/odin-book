import React, { useContext, useState, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Email is already used") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='register-container bg-primary'>
      <div className='register-content'>
        <h1 className='register-title'>Register</h1>
        <form className='register-form' onSubmit={onSubmit}>
          <div className='register-input'>
            <i className='fa fa-user icon'></i>
            <input
              className='input-field'
              type='name'
              placeholder='Name'
              name='name'
              value={name}
              onChange={onChange}
            />
          </div>
          <div className='register-input'>
            <i className='fa fa-envelope icon'></i>
            <input
              className='input-field'
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>

          <div className='register-input'>
            <i className='fas fa-lock icon'></i>
            <input
              className='input-field'
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
            />
          </div>

          <div className='register-input'>
            <i className='fas fa-lock icon'></i>
            <input
              className='input-field'
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={onChange}
            />
          </div>
          <button className='btn-primary btn-register' type='submit'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
