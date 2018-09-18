import React, { Component } from 'react'
import { Row, Col, Button, Tooltip, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import DirectoryComponent from './DirectoryComponent'
import FoldersService from '../../services/databases/foldersService';
import FileService from '../../services/fileService'

class GalleryList extends Component {
    constructor(props) {
        super(props)

        this.toggleAddNewDirectory = this.toggleAddNewDirectory.bind(this)
        this.electronOpenFolderDialog = this.electronOpenFolderDialog.bind(this)

        let foldersService = new FoldersService()
        foldersService.find({}, (error, items) => {
            console.log(JSON.stringify(items))
            this.setState({directories: items})
        })

        this.state = {
            ...props,
            directories: [],

            isAddNewDirectoryModalOpen: false,
            isScanAllDirectoriesModalOpen: false
        }
    }

    toggleAddNewDirectory() {
        this.setState({isAddNewDirectoryModalOpen: !this.state.isAddNewDirectoryModalOpen})
    }

    electronOpenFolderDialog() {
        let fileService = new FileService()
        let scanService = new scanService()
        
        // Ask user to select the folder.
        let foldersList = fileService.showOpenFolder()
        let folder = foldersList[0]

        // Reccursively read folder to get all files.
        let files = fileService.readFolder(folder, (file) => {
            return(file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'))
        })

        files.forEach(file => {
            // Read EXIF
            scanService.readExif(file)

            // If in database, update, else create.
        })
    }

    onElectronOpenFolderDialogFolderSelected(folder, mac) {
        // let fileService = new FileService()
        // let files = fileService.readFolder(folder[0])
        // this.onElectronFolderFilesRetrieved(files)
    }

    onElectronFolderFilesRetrieved(files) {
        // let scannerService = new ScannerService()
        // files.map(file => {
        //     let fileContent = scannerService.scanFile(file)
        //     scannerService.readExifData(fileContent, file, this.onElectronFileScanned)
        // })
    }

    onElectronFileScanned(exifData) {
        console.log('Retrieved Data:' + JSON.stringify(exifData))

        // TODO: save new images.
    }

    addNewDirectory(acceptedFiles, rejectedFiles) {
        console.log(acceptedFiles)
    }

    toggleScanAllDirectories() {
        this.setState({isScanAllDirectoriesModalOpen: !this.state.isScanAllDirectoriesModalOpen})
    }

    scanAllDirectories() {
        if (this.state.isScanAllDirectoriesModalOpen) {
            this.setState({isScanAllDirectoriesModalOpen: !this.state.isScanAllDirectoriesModalOpen})
        }

        this.state.directories.map((element, key) => {
            this.readDirectory(element)
        })
    }

    readDirectory(directory) {
            console.log(directory)
    }

    render() {

        const directories = this.state.directories.map((element, key) => {return <DirectoryComponent {...element} key={key} />})

        return(
        <div className="animated fadeIn">
            <div className="card">
                <div className="card-header">
                    <i className="nav-icon fa fa-image"></i> Galleries
                </div>
                <div className="card-body">
                    <Row>
                        <Col xs="12" sm="6" md="6">
                            <h6>Repertoires</h6>
                            <ul>
                                {directories}
                            </ul>
                            <Button color="primary" onClick={this.toggleAddNewDirectory}>Nouveau répertoire</Button>
                            <Modal isOpen={this.state.isAddNewDirectoryModalOpen} toggle={this.toggleAddNewDirectory} className='modal-primary'>
                                <ModalHeader toggle={this.toggleAddNewDirectory}>Ajouter un nouveau répertoire</ModalHeader>
                                <ModalBody>
                                    Le répertoire ajouté sera automatiquement scané et les medias découverts pourront être retrouvés dans la zone non catégorisée.
                                    <br />
                                    <center>
                                        <Button color="primary" onClick={this.electronOpenFolderDialog}>Parcourir</Button>
                                    </center>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleAddNewDirectory}>Ajouter le répertoire</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleAddNewDirectory}>Annuler</Button>
                                </ModalFooter>
                            </Modal>
                            &nbsp;
                            <Button color="danger" onClick={this.toggleScanAllDirectories}>Forcer un nouveau scan</Button>
                            <Modal isOpen={this.state.isScanAllDirectoriesModalOpen} toggle={this.toggleScanAllDirectories} className='modal-danger'>
                                <ModalHeader toggle={this.toggleScanAllDirectories}>Scaner les répertoires</ModalHeader>
                                <ModalBody>
                                    Le scan peut prendre jusqu'à quelques heures en fonction du nombre de répertoires / medias présents.
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={this.scanAllDirectories}>Lancer le scan maintenant</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleScanAllDirectories}>Annuler</Button>
                                </ModalFooter>
                                </Modal>
                        </Col>
                        <Col xs="12" sm="6" md="6">
                            <Button color="primary">Nouvel album</Button>
                        </Col>
                    </Row>
                    
                </div>
            </div>
        </div>
        )
    }
}

export default GalleryList