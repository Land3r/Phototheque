import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'reactstrap'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <a href="https://github.com/Land3r/Phototheque" target="_blank">Photothèque</a> par <a href="https://github.com/Land3r" target="_blank">Nicolas Gordat</a>
        </span>
        <span className="ml-auto">Utilise <a href="https://coreui.io/react" target="_blank">CoreUI</a> pour <a href="https://reactjs.org/" target="_blank">Reactjs</a>. Packagé avec <a href="https://electronjs.org/" target="_blank">Electron</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
