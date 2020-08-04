import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import MyPosts from "./components/pages/MyPosts";
import Friends from "./components/pages/Friends";
import UserProfile from "./components/pages/UserProfile";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Post from "./components/posts/Post";

import setAuthToken from "./utils/setAuthToken";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import UserState from "./context/user/UserState";
import PostState from "./context/posts/PostState";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <UserState>
      <PostState>
        <AlertState>
          <AuthState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alert />
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <PrivateRoute exact path='/profile' component={Profile} />
                    <PrivateRoute exact path='/myposts' component={MyPosts} />
                    <PrivateRoute exact path='/friends' component={Friends} />
                    <PrivateRoute path='/posts/:id' component={Post} />
                    <PrivateRoute path='/users/:id' component={UserProfile} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AuthState>
        </AlertState>
      </PostState>
    </UserState>
  );
};

export default App;
