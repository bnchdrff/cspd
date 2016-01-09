/* jshint esnext:true */
/* global Meteor, React, ReactMeteorData */
'use strict';

import { _, Table, Column } from 'app-deps';

export default React.createClass({
  displayName: 'FittedTable',

  propTypes: {
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
  },

  getInitialState() {
    return {
      tableWidth: 400,
      tableHeight: 400
    };
  },

  componentDidMount() {
    let win = window;

    if (win.addEventListener) {
      win.addEventListener('resize', _.throttle(this._update, 250), false);
    } else if (win.attachEvent) {
      win.attachEvent('onresize', _.throttle(this._update, 250));
    } else {
      win.onresize = this._update;
    }

    this._update();
  },

  componentWillReceiveProps(props) {
    this._update();
  },

  componentWillUnmount() {
    let win = window;

    if (win.removeEventListener) {
      win.removeEventListener('resize', _.throttle(this._update, 250), false);
    } else if (win.removeEvent) {
      win.removeEvent('onresize', _.throttle(this._update, 250), false);
    } else {
      win.onresize = null;
    }
  },

  _update() {
    if (this.isMounted()) {
      let node = ReactDOM.findDOMNode(this);

      this.setState({
        tableWidth  : node.clientWidth,
        tableHeight : node.clientHeight
      });
    }
  },

  render() {
    return (
      <div className="fitted-wrapper">
        <Table {...this.props} width={this.state.tableWidth} height={this.state.tableHeight}>
          {this.props.children}
        </Table>
      </div>
    );
  },
});
