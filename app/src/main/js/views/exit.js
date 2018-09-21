import React, { Component } from 'react';

class Exit extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Exit app
    const electron = require('electron').remote;
    electron.getCurrentWindow().close();
  }

  render() {
    return null;
  }
}

export default Exit;
