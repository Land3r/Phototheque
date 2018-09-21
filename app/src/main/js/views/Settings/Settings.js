import React, { Component } from 'react'
import { Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, CardDeck, Card, CardBody, CardHeader } from 'reactstrap'
import ReactJsonView from 'react-json-view'

const { shell } = require('electron')
const electronConfig = require('../../../electron-config.json')

class Settings extends Component {
  /**
     * Initializes a new instance of the GalleryList class.
     * @param {*} props The props passed to the component.
     */
  constructor(props) {
    super(props);

    this.getInitialData = this.getInitialData.bind(this);
    this.openExternal = this.openExternal.bind(this);
    this.onSettingsEdit = this.onSettingsEdit.bind(this);

    this.state = {
      ...props,

      electronConfig,
      isModified: false,
    };
  }

  /**
     * Retrieves the data from the databases.
     */
  getInitialData() {
    this.setState({ electronConfig });
  }


  openExternal(url) {
    shell.openExternal(url);
  }

  onSettingsEdit(json) {
    this.setState({ isModified: true });
    console.log(json);
  }

  componentWillUnmount() {
    if (this.state.isModified) {
      // Save modified data
      alert('Wow, you have modified something');
    } else {

    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="nav-icon fa fa-cog" /> Paramètres
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <h6>Paramètres de l'application</h6>
                <p>Ces paramètres gouvernent la manière dont l'application se comporte.</p>
                <ReactJsonView src={this.state.electronConfig} name={false} enableClipboard={false} displayDataTypes={false} onEdit={this.onSettingsEdit} />
                <p>Plus de détails: <span className="likeLink" onClick={() => this.openExternal('https://electronjs.org/docs/api/browser-window#new-browserwindowoptions')}>https://electronjs.org/docs/api/browser-window#new-browserwindowoptions</span></p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Settings;
