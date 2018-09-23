import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import merge from 'deepmerge'
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
      ...props
    }

    this.getInitialState()
  }

  getInitialState() {
    const galleriesService = new GalleriesService()
    galleriesService.find({}, (error, items) => {
      if (error) {
        console.log(error)
      }
      else {
        const { setGalleries } = this.props
        setGalleries(items)
      }
    })
  }

  getGalleriesNavLink() {
    let result = []
    if (this.props.galleries != [] && this.props.galleries.length != 0) {
      result = this.props.galleries.map((element, key) => {
        console.log(JSON.stringify(element))
        let navElement = {
          name: element.name,
          url: '/galleries/'+element._id,
          icon: 'fa fa-image',
        }
        return navElement
      });
    }

    console.log('returned ' + JSON.stringify(result))
    return result
  }

  render() {
    console.log(JSON.stringify(navigation))

    const navGalleries = this.getGalleriesNavLink()
    navGalleries.map()
    let navConfig = navigation
    if (navGalleries.length != 0) {
      navConfig = {items : [{...navConfig.items, ...navGalleries}]}
    }

    console.log(JSON.stringify(navConfig))
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
