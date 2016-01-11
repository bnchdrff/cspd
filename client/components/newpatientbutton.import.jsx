/* jshint esnext:true */
/* global Meteor, React */
'use strict';

import  { bootbox, ReactBootstrap } from 'app-deps';

import { Patients } from 'lib/models/patient';

let { Button } = ReactBootstrap;

export default React.createClass({
  displayName: 'NewPatientButton',

  mixins: [ React.addons.PureRenderMixin ],

  newPatient() {
    bootbox.prompt("Enter patient ID", result => {
      if (result !== null) {
        Patients.insert({
          patientId: result
        });
      }
    });
  },

  render() {
    return (
      <Button bsStyle='success' onClick={this.newPatient}>Add a patient</Button>
    );
  }

});
