/* jshint esnext:true */
/* global Meteor, React, ReactMeteorData, Roles */
'use strict';

import { _, ReactBootstrap, ReactRouterBootstrap, ReactRouter, moment } from 'app-deps';

let { Navbar, CollapsibleNav, Nav, NavItem, DropdownButton, MenuItem } = ReactBootstrap;
let { Link } = ReactRouter;
let { NavItemLink, MenuItemLink } = ReactRouterBootstrap;

// Meteor components for navigation. Uses ReactBootstrap and
// ReactRouterBootstrap to manage the state of which tab is highlighted.

export default React.createClass({
  displayName: 'TopNav',
  mixins: [ ReactMeteorData, ReactRouter.Navigation ],

  getMeteorData() {
    // Reactive data fetch for Meteor user data. Requires `ReactMeteorData` mixin.
    // the returned object is now accessible under `this.data`.
    let user = Meteor.user();
    return {
      user,
      isAdmin: user? Roles.userIsInRole(user, [ 'admin' ]) : false,
    };
  },

  linkClick(event) {
    // Close menu when we click a link
    this.refs.userMenu.setDropdownState(false);
  },

  logout(e) {
    e.preventDefault();
    Meteor.logout();

    this.transitionTo('login');
  },

  render() {
    return (
      <Navbar brand={<Link to="home">CSPD</Link>} inverse fixedTop toggleNavKey={0}>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <NavItemLink to="home">Home</NavItemLink>
          </Nav>
          <Nav navbar right>
            <DropdownButton ref="userMenu" title={this.data.user? this.data.user.username : 'Not logged in'}>
              {this.data.isAdmin? <MenuItemLink onClick={this.linkClick} to="adminUsers">Manage users</MenuItemLink> : ''}
              <MenuItemLink onClick={this.linkClick} to="changePassword">Change password</MenuItemLink>
              <MenuItem onClick={this.logout}>Log out</MenuItem>
            </DropdownButton>
          </Nav>
        </CollapsibleNav>
      </Navbar>
    );
  }

});
