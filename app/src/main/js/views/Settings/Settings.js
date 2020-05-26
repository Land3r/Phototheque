import React, { Component } from 'react'
import { Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, CardDeck, Card, CardBody, CardHeader } from 'reactstrap'
import ReactJsonView from 'react-json-view'
import {Router} from 'react-router-dom'

const { shell } = require('electron')
const electronConfig = require('../../../electron-config.json')

class Settings extends Component {
  /**
     * Initializes a new instance of the GalleryList class.
     * @param {*} props The props passed to the component.
     */
  constructor(props) {
    super(props)

    this.getInitialData = this.getInitialData.bind(this)
    this.openExternal = this.openExternal.bind(this)
    this.onSettingsEdit = this.onSettingsEdit.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.doNotSaveAndExit = this.doNotSaveAndExit.bind(this)
    this.confirmDoNotSaveAndExit = this.confirmDoNotSaveAndExit.bind(this)

    this.state = {
      ...props,

      electronConfig,
      isConfirmExitModalOpen: false,
      hasAskedConfirmation: false,
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
  }

  componentWillUnmount() {
    if (this.state.isModified && !this.state.hasAskedConfirmation) {
      this.doNotSaveAndExit()
    }
  }

  saveSettings() {
      if (this.state.isConfirmExitModalOpen) {
          this.toggleConfirmModal()
      }
      console.log(this.state.electronConfig)
  }

  toggleConfirmModal() {
      this.setState({isConfirmExitModalOpen: !this.state.isConfirmExitModalOpen, hasAskedConfirmation: true})
  }

  doNotSaveAndExit() {
      if (this.state.isModified) {
          this.toggleConfirmModal()
      }
      else {
        this.props.history.push('/')
      }
  }

  confirmDoNotSaveAndExit() {
      if (this.state.isConfirmExitModalOpen) {
          this.toggleConfirmModal()
      }

      this.props.history.push('/')
  }

  /**
   * Render lifecycle method.
   * See https://reactjs.org/docs/react-component.html#render for more info.
   */
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
                <br />
                <p>Plus de détails: <span className="likeLink" onClick={() => this.openExternal('https://electronjs.org/docs/api/browser-window#new-browserwindowoptions')}>https://electronjs.org/docs/api/browser-window#new-browserwindowoptions</span></p>
              </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Button onClick={this.saveSettings} color='primary'>Sauvegarder</Button>&nbsp;
                        <Button onClick={this.doNotSaveAndExit} color='secondary'>Annuler</Button>
                    </FormGroup>
                </Col>
            </Row>
            <Modal isOpen={this.state.isConfirmExitModalOpen} toggle={this.toggleConfirm} className='danger'>
                <ModalHeader toggle={this.toggleConfirmModal}>
                    Quitter sans sauvegarder ?
                </ModalHeader>
                <ModalBody>
                    Etes vous sur de vouloir annuler les modifications effectuées ?
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={this.saveSettings}>Sauvegarder</Button>{' '}
                    <Button color='secondary' onClick={this.confirmDoNotSaveAndExit}>Ne pas sauvegarder</Button>
                </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Settings;
