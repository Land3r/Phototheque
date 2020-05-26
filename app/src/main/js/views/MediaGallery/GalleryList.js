import React, { Component } from 'react'
import { Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, CardDeck, Card, CardBody, CardHeader } from 'reactstrap'
import { config } from '../../config/config'

import DirectoryComponent from './components/DirectoryComponent'
import GalleryTileComponent from './components/GalleryTileComponent'

import FoldersService from '../../services/databases/foldersService'
import GalleriesService from '../../services/databases/galleriesService'
import MediasService from '../../services/databases/mediasService'
import FileService from '../../services/fileService'
import ScannerService from '../../services/scannerService'

/**
 * Gallery List component.
 * Used to display a list of galleries.
 */
class GalleryList extends Component {
  /**
     * Initializes a new instance of the GalleryList class.
     * @param {*} props The props passed to the component.
     */
  constructor(props) {
    super(props)

    // Bindings
    this.getInitialData = this.getInitialData.bind(this)
    this.addNewFolderBtnClick = this.addNewFolderBtnClick.bind(this)
    this.toggleAddNewFolderModal = this.toggleAddNewFolderModal.bind(this)
    this.scanAllDirectoriesBtnClick = this.scanAllDirectoriesBtnClick.bind(this)
    this.toggleScanAllDirectoriesModal = this.toggleScanAllDirectoriesModal.bind(this)

    this.toggleAddNewGalleryModal = this.toggleAddNewGalleryModal.bind(this)
    this.addNewGalleryBtnClick = this.addNewGalleryBtnClick.bind(this)

    this.addOrUpdateMedias = this.addOrUpdateMedias.bind(this)

    // State
    this.state = {
      ...props,

      isAddNewFolderModalOpen: false,
      isScanAllDirectoriesModalOpen: false,
      isNewGalleryFormModalOpen: false,

      newGalleryFormName: '',
      newGalleryFormDescription: '',
    }
  }

  /**
   * ComponentDidMount lifecycle method.
   * See https://reactjs.org/docs/react-component.html#componentdidmount for more info.
   */
  componentDidMount() {
    this.getInitialData()
  }

  /**
   * Retrieves the data from the databases.
   */
  getInitialData() {
  }

  /**
   * Toggles the modal for adding a new folder.
   */
  toggleAddNewFolderModal() {
    this.setState({ isAddNewFolderModalOpen: !this.state.isAddNewFolderModalOpen })
  }
  
  /**
   * Event receiver for the 'Add new folder' button.
   */
  addNewFolderBtnClick() {
    const fileService = new FileService()

    // Asks user to select the folder.
    const foldersList = fileService.showOpenFolder()
    const folder = foldersList[0]

    // Is the folder already in the folder list ?
    if (this.props.folders.map(element => (element.directory)).indexOf(folder) > -1) {
      this.toggleAddNewFolderModal()
      alert('Folder is already in the list. Use re-scan instead.')
      return
    }

    // Parse the folder.
    this.parseDirectory(folder, true)

    // Reset Modal.
    this.toggleAddNewFolderModal()
  }

  /**
   * Adds or update a media in the database.
   */
  addOrUpdateMedias(files) {
    const scanService = new ScannerService()
    files.forEach((file) => {
      try {
        let exts = file.toLowerCase().split('.')
        let ext = exts[exts.length - 1]
        let exifData = {}
  
        if (config.EXIF_EXT.indexOf(ext) > -1) {
          const fileContent = scanService.readFile(file)
          exifData = scanService.readExifData(fileContent)
        }
  
        // Update or create media.
        const media = {
          path: file,
          exif: exifData,
        }
        MediasService.insertOrUpdate(media)
      }
      catch(error) {
        console.error(`An error arrived while inserting or updating media ${file}. Error : ${error}`)
      }
    })
  }

  /**
   * Toggles the modal for the 'Scan all directories'.
   */
  toggleScanAllDirectoriesModal() {
    this.setState({ isScanAllDirectoriesModalOpen: !this.state.isScanAllDirectoriesModalOpen })
  }

  /**
   * Event receiver for the 'Scan all folders' button.
   */
  scanAllDirectoriesBtnClick() {
    this.props.folders.map(element => {
      this.parseDirectory(element.directory, false)
    });

    this.toggleScanAllDirectoriesModal()
  }

  /**
   * Parse a folder to get all compatible items, add them or update them in the database, and then add the folder to the the list of parsed folders if needed.
   * @param {*} folder The folder to parse.
   * @param {*} addFolder Whether or not to add the folder to the list of parsed folders. Defaults to false.
   */
  parseDirectory(folder, addFolder = false) {
    // Recursively read folder to get all files.
    const fileService = new FileService()
    const files = fileService.readFolderForCompatibleFiles(folder)
    
    // Create or update medias based on files found.
    this.addOrUpdateMedias(files)

    // Inserts the folder into the list of parsed folders if it is a new folder.
    if (addFolder) {
      try {
        const folderItem = {
          directory: folder,
          date_last_scan: new Date(),
          medias_total: files.length,
        }
        FoldersService.insert(folderItem, (error, item) => {
          if (error) {
            console.log(error)
          } else {
            // Folder created.
          }
        })
      }
      catch(error) {
        console.error(`An error arrived while inserting folder ${folder}. Error : ${error}`)
      }
    }
  }

  /**
   * Toggles the modal for adding a new gallery.
   */
  toggleAddNewGalleryModal() {
    this.setState({ isNewGalleryFormModalOpen: !this.state.isNewGalleryFormModalOpen })
  }

  /**
   * Event receiver for the 'Add new gallery button'.
   * @param {*} event The click event. 
   */
  addNewGalleryBtnClick(event) {
    event.preventDefault()

    // Create element
    const gallery = {
      name: this.state.newGalleryFormName,
      description: this.state.newGalleryFormDescription,
      medias: [],
      image: null,
    }
    GalleriesService.insert(gallery, (error, items) => {
      if (error) {
        console.log(error)
      } else {
        // Gallery added.

        // Reset form
        this.setState({ newGalleryFormName: '' })
        this.toggleAddNewGalleryModal()
      }
    });
  }
  
  /**
   * Render lifecycle method.
   * See https://reactjs.org/docs/react-component.html#render for more info.
   */
  render() {
    const folders = this.props.folders.map((element, key) => <DirectoryComponent {...element} key={key} />)
    const galleries = this.props.galleries.map((gallery, key) => <GalleryTileComponent {...gallery} key={key} />)

    const canAddNewGallery = this.state.newGalleryFormName != ''

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="nav-icon fa fa-image" /> Galleries
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <h6>Répertoires</h6>
                <ul>
                  {folders}
                </ul>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" md="6">
                <Button color="primary" onClick={this.toggleAddNewFolderModal}>Nouveau répertoire</Button>
                {' '}
                <Button color="danger" onClick={this.toggleScanAllDirectoriesModal}>Forcer un nouveau scan</Button>
              </Col>
              <Col xs="12" sm="6" md="6">
                <Button color="primary" onClick={this.toggleAddNewGalleryModal}>Nouvel album</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.isScanAllDirectoriesModalOpen} toggle={this.toggleScanAllDirectoriesModal} className="modal-danger">
          <ModalHeader toggle={this.toggleScanAllDirectoriesModal}>Scaner les répertoires</ModalHeader>
          <ModalBody>
            <p>Le scan peut prendre jusqu'à quelques heures en fonction du nombre de répertoires / medias présents.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.scanAllDirectoriesBtnClick}>Lancer le scan maintenant</Button>{' '}
            <Button color="secondary" onClick={this.toggleScanAllDirectoriesModal}>Annuler</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isAddNewFolderModalOpen} toggle={this.toggleAddNewFolderModal} className="modal-primary">
          <ModalHeader toggle={this.toggleAddNewFolderModal}>Ajouter un nouveau répertoire</ModalHeader>
          <ModalBody>
            <p>Le répertoire ajouté sera automatiquement scané et les medias découverts pourront être retrouvés dans la zone non catégorisée.</p>
            <br />
            <center>
              <Button color="primary" onClick={this.addNewFolderBtnClick}>Parcourir</Button>
            </center>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleAddNewFolderModal}>Annuler</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isNewGalleryFormModalOpen} toggle={this.toggleAddNewGalleryModal} className="modal-primary">
          <ModalHeader toggle={this.toggleAddNewGalleryModal}>Ajouter une nouvelle gallerie</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Nom</Label>
              <Input type="text" id="name" placeholder="Entrez le nom de la gallerie" value={this.state.newGalleryFormName} onChange={(event) => { this.setState({ newGalleryFormName: event.target.value }); }} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input type="text" id="description" placeholder="Entrez la description de la gallerie" value={this.state.newGalleryFormDescription} onChange={(event) => { this.setState({ newGalleryFormDescription: event.target.value }); }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addNewGalleryBtnClick} disabled={!canAddNewGallery}>Ajouter le répertoire</Button>{' '}
            <Button color="secondary" onClick={this.toggleAddNewGalleryModal}>Annuler</Button>
          </ModalFooter>
        </Modal>
        <CardDeck>
          {galleries}
        </CardDeck>
      </div>
    );
  }
}

export default GalleryList;
