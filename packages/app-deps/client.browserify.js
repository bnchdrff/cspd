/* global require, Dependencies:true, global, React */

global.React = React;

Dependencies = {
  _: require('lodash'),
  moment: require('moment'),
  classnames: require('classnames'),

  bootbox: require('bootbox'),

  history: require('history'),

  ReactRouter: require('react-router'),
  ReactBootstrap: require('react-bootstrap'),
  ReactRouterBootstrap: require('react-router-bootstrap'),

  ReactDatePicker: require('react-date-picker'),

  Table: require('fixed-data-table').Table,
  Column: require('fixed-data-table').Column,
};
