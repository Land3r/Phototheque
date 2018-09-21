import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../../res/images/brand/logo.png'
import sygnet from '../../../res/images/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...props,

      isSidetoggled: false
    }
  }
  render() {

    console.log(logo)

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to='/'>Accueil</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to='/settings'>Paramètres</Link>
          </NavItem>
        </Nav>
        <div className="ml-auto electron-draguable">
        </div>
        <span onClick={(event) => {this.setState({isSidetoggled: !this.state.isSidetoggled})}}>
          <AppAsideToggler className={this.state.isSidetoggled ? 'fa fa-chevron-right ' : 'fa fa-chevron-left ' } />
        </span>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
