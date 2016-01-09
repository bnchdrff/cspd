/* jshint esnext:true */
/* global Meteor, React, ReactDOM */
'use strict';

import { _, Router } from 'app-deps';

import { Login, ResetPassword, EnrollAccount, ChangePassword } from 'client/components/login';
import { AdminUsers, CreateUser } from 'client/components/users';

import App from 'client/components/app';
import Home from 'client/components/home';

let { Route, DefaultRoute } = Router;

// On startup, let the router take over the `main` div in the markup.

Meteor.startup(() => {

  // Define client-side routes using ReactRouter, which is imported as an NPM
  // module in the `app-deps` package.

  let routes = [
    // Account management
    <Route name="login" path="/login" handler={Login}/>,
    <Route name="resetPassword" path="/reset-password/:token" handler={ResetPassword}/>,
    <Route name="enrollAccount" path="/enroll-account/:token" handler={EnrollAccount}/>,
    <Route name="changePassword" path="/change-password" handler={ChangePassword}/>,

    // App
    <Route name="home" path="/" handler={App}>

      // User facing functionality
      <DefaultRoute handler={Home} />

      // Administration
      <Route name="adminUsers" path="admin/users" handler={AdminUsers}/>
      <Route name="adminCreateUser" path="admin/create-user" handler={CreateUser}/>

    </Route>
  ];

  let router = Router.create({
    routes,
    location: Router.HistoryLocation
  });

  router.run((Root, state) => {
    ReactDOM.render(<Root />, document.getElementById('main'));
  });
});
