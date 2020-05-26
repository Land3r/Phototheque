import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { shell } = require('electron');

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  constructor(props) {
    super(props);

    this.openExternal = this.openExternal.bind(this);
  }

  openExternal(url) {
    shell.openExternal(url);
  }

  /**
   * Render lifecycle method.
   * See https://reactjs.org/docs/react-component.html#render for more info.
   */
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <span className="likeLink" onClick={() => this.openExternal('https://github.com/Land3r/Phototheque')}>Photothèque</span> par <span className="likeLink" onClick={() => this.openExternal('https://github.com/Land3r')}>Nicolas Gordat</span>
        </span>
        <span className="ml-auto">
          Utilise <span className="likeLink" onClick={() => this.openExternal('https://coreui.io/react')}>CoreUI</span> pour <span className="likeLink" onClick={() => this.openExternal('https://reactjs.org/')}>Reactjs</span>. Packagé avec <span className="likeLink" onClick={() => this.openExternal('https://electronjs.org/')}>Electron</span>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
