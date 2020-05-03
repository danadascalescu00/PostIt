import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Profile from './containers/Profile';
import Register from './containers/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
// import UpdateProfile from './containers/UpdateProfile';
// import ForgotPassword from './containers/ForgotPassword';
// import ResetPassword from './containers/ResetPassword';
// import UpdatePassword from './containers/UpdatePassword';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/userProfile" component={Profile} />
      {/* <Route exact path="/reset/:token" component={ResetPassword} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Route exact path="/updateUser/:username" component={UpdateProfile} />
      <Route
        exact
        path="/updatePassword/:username"
        component={UpdatePassword}
      /> */}
    </Switch>
  </div>
);

export default Routes;