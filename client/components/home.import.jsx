/* jshint esnext:true */
/* global Meteor, React */
'use strict';

import { moment, Table, Column, bootbox, ReactBootstrap } from 'app-deps';

import Loading from 'client/components/loading';
import FittedTable from 'client/components/fittedtable';

import { Patients } from 'lib/models/patient';

import NewPatientButton from 'client/components/newpatientbutton';
import EditableDateCell from 'client/components/editabledatecell';

let { ButtonToolbar } = ReactBootstrap;

export default React.createClass({
  displayName: 'Home',

  mixins: [ ReactMeteorData ],

  getMeteorData() {
    let user = Meteor.user();
    let subscriptionHandle = Meteor.subscribe('patients');

    return {
      loading: !subscriptionHandle.ready(),
      patients: Patients.find().fetch()
    };
  },

  getRow(rowIndex) {
    return this.data.patients[rowIndex];
  },

  renderTime(cellData, cellDataKey, rowData, rowIndex) {
    const humanTime = (cellData) ? moment(cellData).format('ll') : 'no';

    return (
      <span>{humanTime}</span>
    );
  },

  render() {
    if (this.data.loading) {
      return <Loading />;
    }

    let wrapStyle = {
      height: '500px'
    };

    return (
      <div className="home-page">
        <h1 className="page-heaer">Patients</h1>
        <ButtonToolbar>
          <NewPatientButton />
        </ButtonToolbar>
        <FittedTable
          rowHeight={50}
          rowGetter={this.getRow}
          rowsCount={this.data.patients.length}
          headerHeight={50}>
          <Column dataKey="patientId" label="Patient ID" width={100} flexGrow={1} cellRenderer={this.renderPatientId} />
          <Column dataKey="painContractSignedDate" label="Pain contract" width={100} flexGrow={1} cellRenderer={this.renderTime} />
          <Column dataKey="opoidRiskToolDate" label="Opoid risk tool" width={100} flexGrow={1} cellRenderer={this.renderTime} />
          <Column dataKey="mapsDate" label="MAPS" width={100} flexGrow={1} cellRenderer={this.renderTime} />
          <Column dataKey="urineDate" label="Urine" width={100} flexGrow={1} cellRenderer={this.renderTime} />
        </FittedTable>
      </div>
    );
  }
});
