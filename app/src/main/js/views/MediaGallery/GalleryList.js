import React, { Component } from 'react';
import { Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, CardDeck, Card, CardBody, CardHeader } from 'reactstrap';

import DirectoryComponent from './components/DirectoryComponent';
import GalleryTileComponent from './components/GalleryTileComponent';

import FoldersService from '../../services/databases/foldersService';
import GalleriesService from '../../services/databases/galleriesService';
import MediasService from '../../services/databases/mediasService';
import FileService from '../../services/fileService';
import ScannerService from '../../services/scannerService';

class GalleryList extends Component {
  /**
     * Initializes a new instance of the GalleryList class.
     * @param {*} props The props passed to the component.
     */
  constructor(props) {
    super(props);

    this.getInitialData = this.getInitialData.bind(this);
    this.toggleAddNewDirectory = this.toggleAddNewDirectory.bind(this);
    this.electronOpenFolderDialog = this.electronOpenFolderDialog.bind(this);
    this.toggleNewGalleryForm = this.toggleNewGalleryForm.bind(this);
    this.addNewGallery = this.addNewGallery.bind(this);
    this.toggleScanAllDirectories = this.toggleScanAllDirectories.bind(this);
    this.addNewDirectory = this.addNewDirectory.bind(this);
    this.scanAllDirectories = this.scanAllDirectories.bind(this);

    this.state = {
      ...props,

      folders: [],
      galleries: [],

      isAddNewDirectoryModalOpen: false,
      isScanAllDirectoriesModalOpen: false,
      isNewGalleryFormModalOpen: false,

      newGalleryFormName: '',
      newGalleryFormDescription: '',
    };

    this.getInitialData();
  }

  /**
     * Retrieves the data from the databases.
     */
  getInitialData() {
    const galleriesService = new GalleriesService();
    galleriesService.find({}, (error, items) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({ galleries: items });

        const mediasService = new MediasService();

        items.forEach((gallery) => {
          if (gallery.medias != undefined && gallery.medias.length != 0) {
            const randomImage = gallery.medias[Math.floor(Math.random() * gallery.medias.length)];
            mediasService.findById(randomImage, (error, item) => {
              if (error) {
                console.log(error);
              } else {
                const galleries = this.state.galleries;
                const currentGalleryIndex = galleries.findIndex(element => element._id == gallery._id);
                galleries[currentGalleryIndex].image = item.path;
                this.setState({ galleries });
              }
            });
          }
        });
      }
    });

    const foldersService = new FoldersService();
    foldersService.find({}, (error, items) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({ folders: items });
      }
    });
  }

  toggleAddNewDirectory() {
    this.setState({ isAddNewDirectoryModalOpen: !this.state.isAddNewDirectoryModalOpen });
  }

  electronOpenFolderDialog() {
    const fileService = new FileService();
    const scanService = new ScannerService();
    const mediasService = new MediasService();
    const foldersService = new FoldersService();
    const galleriesService = new GalleriesService();

    // Ask user to select the folder.
    const foldersList = fileService.showOpenFolder();
    const folder = foldersList[0];

    // Reccursively read folder to get all files.
    const files = fileService.readFolder(folder, file => (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')));

    files.forEach((file) => {
      const fileContent = scanService.readFile(file);
      const exifData = scanService.readExifData(fileContent);
      const mediaFromDb = {};

      // If in database, update, else create.
      mediasService.findOne({ path: file }, (error, item) => {
        if (error) {
          console.log(error);
        } else if (item == null) {
          const media = {
            path: file,
            exif: exifData,
          };
          mediasService.insert(media, (error, item) => {
            if (error) {
              console.log(error);
            } else {
              // Item created with success.
              galleriesService.addMediasToGallery(item, { name: 'Non catégorisé' }, (error, numberOfItems, upsets) => {
                if (error) {
                  console.log(error);
                } else {
                }
              });
            }
          });
        } else {
          // UPDATE
          mediasService.update({ _id: item._id }, { $set: { exif: exifData } }, { multi: false, upsert: false }, (error, numberOfItems, upsets) => {
            if (error) {
              console.log(error);
            } else {
              // Item updated with success.
              galleriesService.addMediasToGallery(item, { name: 'Non catégorisé' }, (error, numberOfItems, upsets) => {
                if (error) {
                  console.log(error);
                } else {
                }
              });
            }
          });
        }
      });
    });

    const folderItem = {
      directory: folder,
      date_last_scan: new Date(),
      medias_total: files.length,
    };
    foldersService.insert(folderItem, (error, item) => {
      if (error) {
        console.log(error);
      } else {
        // Folder created.
        const folders = this.state.folders;
        folders.push(item);
        this.setState({ folders });
      }
    });

    // Reset Modal
    this.toggleAddNewDirectory();
  }

  toggleScanAllDirectories() {
    this.setState({ isScanAllDirectoriesModalOpen: !this.state.isScanAllDirectoriesModalOpen });
  }

  scanAllDirectories() {
    if (this.state.isScanAllDirectoriesModalOpen) {
      this.setState({ isScanAllDirectoriesModalOpen: !this.state.isScanAllDirectoriesModalOpen });
    }

    this.state.folders.map((element, key) => {
      this.readDirectory(element.directory);
    });
  }

  readDirectory(directory) {
    const fileService = new FileService();
    const scanService = new ScannerService();
    const mediasService = new MediasService();
    const foldersService = new FoldersService();
    const galleriesService = new GalleriesService();
    
    const files = fileService.readFolder(directory, file => (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')));

    files.forEach((file) => {
      const fileContent = scanService.readFile(file);
      const exifData = scanService.readExifData(fileContent);
      const mediaFromDb = {};

      // If in database, update, else create.
      mediasService.findOne({ path: file }, (error, item) => {
        if (error) {
          console.log(error);
        } else if (item == null) {
          const media = {
            path: file,
            exif: exifData,
          };
          mediasService.insert(media, (error, item) => {
            if (error) {
              console.log(error);
            } else {
              // Item created with success.
              galleriesService.addMediasToGallery(item, { name: 'Non catégorisé' }, (error, numberOfItems, upsets) => {
                if (error) {
                  console.log(error);
                } else {
                }
              });
            }
          });
        } else {
          // UPDATE
          mediasService.update({ _id: item._id }, { $set: { exif: exifData } }, { multi: false, upsert: false }, (error, numberOfItems, upsets) => {
            if (error) {
              console.log(error);
            } else {
              // Item updated with success.
              galleriesService.addMediasToGallery(item, { name: 'Non catégorisé' }, (error, numberOfItems, upsets) => {
                if (error) {
                  console.log(error);
                } else {
                }
              });
            }
          });
        }
      });
    });
  }

  toggleNewGalleryForm() {
    this.setState({ isNewGalleryFormModalOpen: !this.state.isNewGalleryFormModalOpen });
  }

  addNewGallery(event) {
    event.preventDefault();

    // Create element
    const galleriesService = new GalleriesService();
    const gallery = {
      name: this.state.newGalleryFormName,
      description: this.state.newGalleryFormDescription,
      medias: [],
      image: null,
    };
    galleriesService.insert(gallery, (error, items) => {
      if (error) {
        console.log(error);
      } else {
        // Add item
        const galleries = this.state.galleries;
        galleries.push(items);
        this.setState({ galleries });

        // Reset form
        this.setState({ newGalleryFormName: '' });
        this.toggleNewGalleryForm();
      }
    });
  }

  addNewDirectory(directory) {
    // Create element
    const foldersService = new FoldersService();
    const folder = {
      directory,
      medias_total: 0,
      date_last_scan: null,
    };
    foldersService.insert(folder, (error, items) => {
      if (error) {
        console.log(error);
      } else {
        // Add item
        const folders = this.state.directories;
        folders.push(items);
        this.setState({ directories: folders });
      }
    });
  }

  render() {
    const folders = this.state.folders.map((element, key) => <DirectoryComponent {...element} key={key} />);
    const galleries = this.state.galleries.map((gallery, key) => <GalleryTileComponent {...gallery} key={key} />);

    const canAddNewGallery = this.state.newGalleryFormName != '';

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="nav-icon fa fa-image" /> Galleries
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <h6>Repertoires</h6>
                <ul>
                  {folders}
                </ul>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" md="6">
                <Button color="primary" onClick={this.toggleAddNewDirectory}>Nouveau répertoire</Button>
                {' '}
                <Button color="danger" onClick={this.toggleScanAllDirectories}>Forcer un nouveau scan</Button>
              </Col>
              <Col xs="12" sm="6" md="6">
                <Button color="primary" onClick={this.toggleNewGalleryForm}>Nouvel album</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.isScanAllDirectoriesModalOpen} toggle={this.toggleScanAllDirectories} className="modal-danger">
          <ModalHeader toggle={this.toggleScanAllDirectories}>Scaner les répertoires</ModalHeader>
          <ModalBody>
                        Le scan peut prendre jusqu'à quelques heures en fonction du nombre de répertoires / medias présents.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.scanAllDirectories}>Lancer le scan maintenant</Button>{' '}
            <Button color="secondary" onClick={this.toggleScanAllDirectories}>Annuler</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isAddNewDirectoryModalOpen} toggle={this.toggleAddNewDirectory} className="modal-primary">
          <ModalHeader toggle={this.toggleAddNewDirectory}>Ajouter un nouveau répertoire</ModalHeader>
          <ModalBody>
            <p>Le répertoire ajouté sera automatiquement scané et les medias découverts pourront être retrouvés dans la zone non catégorisée.</p>
            <br />
            <center>
              <Button color="primary" onClick={this.electronOpenFolderDialog}>Parcourir</Button>
            </center>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleAddNewDirectory}>Annuler</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isNewGalleryFormModalOpen} toggle={this.toggleNewGalleryForm} className="modal-primary">
          <ModalHeader toggle={this.toggleNewGalleryForm}>Ajouter une nouvelle gallerie</ModalHeader>
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
            <Button color="primary" onClick={this.addNewGallery} disabled={!canAddNewGallery}>Ajouter le répertoire</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewGalleryForm}>Annuler</Button>
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
