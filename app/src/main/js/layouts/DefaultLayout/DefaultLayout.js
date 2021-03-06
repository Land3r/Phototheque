import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import GalleriesService from '../../services/databases/galleriesService'

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar default nav
import navigation from '../../routes/_nav';

// routes config
import routes from '../../routes/routes';

import DefaultAside from '../../containers/default_layout/default_aside';

import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.getGalleriesNavLink = this.getGalleriesNavLink.bind(this)
    this.getInitialState = this.getInitialState.bind(this)

    this.state = {
      ...props,

      defaultNavConfig: navigation
    }
  }

  /**
   * ComponentDidMount lifecycle method.
   * See https://reactjs.org/docs/react-component.html#componentdidmount for more info.
   */
  componentDidMount() {
    this.getInitialState()
  }

  getInitialState() {
  }

  getGalleriesNavLink() {
    let result = []
    if (this.props.galleries != [] && this.props.galleries.length != 0) {
      result = this.props.galleries.map((element, key) => {
        let navElement = {
          name: element.name,
          url: '/galleries/'+element._id,
          icon: 'fa fa-image',
        }
        return navElement
      });
    }

    return result
  }

  /**
   * Render lifecycle method.
   * See https://reactjs.org/docs/react-component.html#render for more info.
   */
  render() {

    const navGalleries = this.getGalleriesNavLink()
    let navConfig = JSON.parse(JSON.stringify(this.state.defaultNavConfig))

    if (navGalleries.length != 0) {
      navGalleries.map((element, key) => {
          navConfig.items.splice(navConfig.items.length - 2, 0, element);
      })
    }

    return (
      <div className="app">
        <AppHeader fixed className="electron-draguable">
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navConfig} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => (route.component ? (<Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <route.component {...props} />
                      )}
                />)
                      : (null)))}
                <Redirect from="/" to="/galleries" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter className="electron-draguable">
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
