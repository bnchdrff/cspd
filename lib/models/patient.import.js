/* jshint esnext:true */
/* global Meteor, Mongo, SimpleSchema, Roles */
'use strict';

import { moment } from 'app-deps';

let Patient = new SimpleSchema({
  patientId: {
    type: Number,
    label: 'Patient ID, via EMR data'
  },
  painContractSignedDate: {
    type: Date,
    label: 'Pain contract signature date',
    optional: true
  },
  opoidRiskToolDate: {
    type: Date,
    label: 'Opoid risk tool completion date',
    optional: true
  },
  mapsDate: {
    type: Date,
    label: 'Michigan Automated Perscription System date',
    optional: true
  },
  urineDate: {
    type: Date,
    label: 'Urine drug screen date',
    optional: true
  },
  history: {
    type: [Object],
    label: 'Change history',
    optional: true,
    autoValue() {
      const data = {
        painContractSignedDate: this.field('painContractSignedDate'),
        opoidRiskToolDate: this.field('opoidRiskToolDate'),
        mapsDate: this.field('mapsDate'),
        urineDate: this.field('urineDate')
      };

      const date = new Date();

      if (this.isInsert) {
        return [{
          date,
          data
        }];
      } else {
        return {
          $push: {
            date,
            data
          }
        };
      }
    }
  },
  'history.$.date': {
    type: Date,
    optional: true
  },
  'history.$.data': {
    type: Object,
    blackbox: true,
    optional: true
  },
});

export let Patients = new Mongo.Collection('Patients');

Patients.attachSchema(Patient);

Patients.allow({
  insert(userId, doc) {
    return (userId && Roles.userIsInRole(userId, [ 'write', 'admin' ]));
  },
  update(userId, doc, fields, modifier) {
    return (userId && Roles.userIsInRole(userId, [ 'write', 'admin' ]));
  },
  remove(userId, doc) {
    return (userId && Roles.userIsInRole(userId, [ 'write', 'admin' ]));
  }
});

Meteor.methods({
  /**
   * Records a date for a certain field in one patient's record.
   *
   * @method
   * @param {Object} docId - The doc id to modify
   * @param {string} fieldName - One of the date fields as found in SimpleSchema above
   * @param {date} date - A date
   * @returns {number} of documents updated (0|1)
   */
  'Patient.recordFieldDate': function(docId, fieldName, date) {
    let allowedFields = [
      'painContractSignedDate',
      'mapsDate',
      'urineDate'
    ];

    if (allowedFields.indexOf(fieldName) < 0) {
      return 0;
    }

    let count = Patients.update({ _id: docId }, { $set: { [fieldName]: date } });

    console.log('[Patient.' + fieldName + ']', docId.toString(), date);

    return count;
  }
});

if (Meteor.isServer) {

  /**
   * All patients.
   */
  Meteor.publish('patients', function() {
    if (!this.userId) {
      return;
    }

    return Patients.find({});
  });

}
