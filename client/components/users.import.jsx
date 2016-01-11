/* jshint esnext: true */
/* global Meteor, React, ReactDOM, Blaze, Template */
'use strict';

import { _, ReactRouter, ReactBootstrap } from 'app-deps';

let { Link } = ReactRouter;
let { Alert, Input, Button } = ReactBootstrap;

// React components for managing users

export let AdminUsers = React.createClass({
  displayName: 'AdminUsers',

  render() {
    return (
      <div>
        <h1 className="page-header">Manage users</h1>
        <p>
          Use the table below to find, create, edit or delete users.
        </p>
        <Link className="btn btn-default pull-right" to="adminCreateUser" role="button">Create User</Link>
        <ManageUsers />
      </div>
    );
  }

});

// This component uses the Meteor Blaze template engine to render the template
// from the `accounts-admin-ui-bootstrap-3` package.

export let ManageUsers = React.createClass({
  displayName: 'ManageUsers',

  // render template from accounts-admin-ui-bootstrap-3 package using Blaze

  componentDidMount() {
    this._rendered = Blaze.render(Template.accountsAdmin, ReactDOM.findDOMNode(this));
  },

  shouldComponentUpdate() {
    return false;
  },

  componentWillUnmount() {
    Blaze.remove(this._rendered);
    this._rendered = null;
  },

  render() {
    return <span />;
  }

});

export let CreateUser = React.createClass({
  displayName: 'CreateUser',
  mixins: [ React.addons.LinkedStateMixin, ReactRouter.Navigation ],

  getInitialState() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      role: '',
      invalid: false,
      error: false,
      errorMessage: '',
    };
  },

  onSubmit(e) {
    e.preventDefault();

    if (!this.state.email) {
      this.setState({ invalid: true, error: false, errorMessage: '' });
      return;
    } else {
      this.setState({ invalid: false, error: false, errorMessage: '' });
    }

    const role = this.state.role? this.state.role : 'read';

    Meteor.call('createNewUser', this.state.email, role, err => {
      if (err) {
        this.setState({ invalid: false, error: true, errorMessage: err.reason || 'An unexpected error occurred' });
      } else {
        this.transitionTo('adminUsers');
      }
    });
  },

  render() {
    return (
      <form className="form-signin" onSubmit={this.onSubmit}>
        <h2 className="form-signin-heading">Create user</h2>

        {this.state.invalid? <Alert bsStyle="danger">Email address is required.</Alert> : ''}
        {this.state.error? <Alert bsStyle="danger">{this.state.errorMessage}</Alert> : ''}

        <Input type="email" labelClassName="sr-only" label="Email address" required autofocus placeholder="Email address" valueLink={this.linkState('email')} />

        <Input type="select" labelClassName="sr-only" label="Role" required placeholder="Role" valueLink={this.linkState('role')}>
          <option value="read">Read-only</option>
          <option value="write">Read-write</option>
          <option value="admin">Administrator</option>
        </Input>

        <Button bsStyle="primary" block type="submit">Create user</Button>
        <div className="form-group">
          <Link to="adminUsers">Cancel</Link>
        </div>
      </form>
    );
  }

});
