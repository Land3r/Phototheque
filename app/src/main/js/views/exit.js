import React, { Component } from 'react';

/**
 * Exit component.
 * Renderless component used to exit the application.
 */
class Exit extends Component {
  /**
   * Initalizes a new instance of the Exit class.
   */
  constructor(props) {
    super(props);
  }

  /**
   * ComponentDidMount lifecycle method.
   * See https://reactjs.org/docs/react-component.html#componentdidmount for more info.
   */
  componentDidMount() {
    // Exit the application on mount.
    const electron = require('electron').remote;
    electron.getCurrentWindow().close();
  }

  /**
   * Render lifecycle method.
   * See https://reactjs.org/docs/react-component.html#render for more info.
   */
  render() {
    return null;
  }
}

export default Exit;