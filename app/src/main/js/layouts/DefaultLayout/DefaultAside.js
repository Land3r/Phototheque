import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react';
import ReactJsonView from 'react-json-view';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      ...props,
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  formatMediaTitle(mediaPath) {
    let mediaParts = mediaPath.split('\\')
    if (mediaParts.length > 0) {
      let mediaBase = ''
      let mediaName = ''
      for (let index = 0; index < mediaParts.length - 1; index++) {
        mediaBase += mediaParts[index] + '\\';
      }
      mediaName = mediaParts[mediaParts.length - 1]

      return (
        <React.Fragment>
          {mediaBase}<br />
          <span style={{'fontWeight': 'bold'}}>{mediaName}</span>
        </React.Fragment>
      )
    }
    else {
      return mediaPath
    }
  }

  /**
   * Render lifecycle method.
   * See https://reactjs.org/docs/react-component.html#render for more info.
   */
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const mediaTitle = this.props.medias.media ? this.formatMediaTitle(this.props.medias.media.path) : ''

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
              <i className="fa fa-image" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
              <i className="fa fa-code" />
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
                <div style={{ padding: '15px', wordWrap: 'break-word' }}>
                  <h4>{mediaTitle}</h4>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <div style={{ padding: '15px' }}>
                  <h4>Données Exif</h4>
                  <br />
                  <ReactJsonView src={this.props.medias.media ? this.props.medias.media.exif : {}} displayDataTypes={false} />
                </div>
              </Col>
            </Row>

          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
