/* jshint esnext:true */
/* global Meteor, Mongo, Roles */
'use strict';

import { _ } from 'app-deps';

Meteor.users.allow({
  update(userId, user, fields, modifier) {
    return userId && userId === user._id;
  }
});

if (Meteor.isServer) {

  Meteor.publish('userData', function () {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, {
        fields: { 'profile': 1 }
      });
    } else {
      this.ready();
    }
  });

} else if (Meteor.isClient) {
  Meteor.subscribe('userData');
}
