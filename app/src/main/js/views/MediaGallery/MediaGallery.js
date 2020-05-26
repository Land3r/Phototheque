import React, { Component, Fragment } from 'react';
import { Alert, Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle, Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';

import GalleryImageComponent from './../../containers/media_gallery/components/gallery_image_component';
import GalleryVideoComponent from './Components/GalleryVideoComponent' 

import GalleriesService from '../../services/databases/galleriesService';
import MediasService from '../../services/databases/mediasService';

/**
 * Media Gallery component.
 * Used to display a Gallery of medias
 */
class MediaGallery extends Component {
  /**
   * Initializes a new instance of the MediaGallery component.
   * @param {*} props 
   */
  constructor(props) {
    super(props)

    this.getInitialData = this.getInitialData.bind(this)
    this.toggleEditGalleryModal = this.toggleEditGalleryModal.bind(this)
    this.editGallery = this.editGallery.bind(this)
    this.getRandomNumber = this.getRandomNumber.bind(this)

    this.state = {
      ...props,

      gallery: {
        _id: 0,
        name: '',
        description: '',
        medias: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      alertText: '',
      isEditGalleryFormModalOpen: false,
      editGallery: {
        name: '',
        description: ''
      },
      images: [],
    };
  }

  /**
   * ComponentDidMount lifecycle method.
   * See https://reactjs.org/docs/react-component.html#componentdidmount for more info.
   */
  componentDidMount() {
    this.getInitialData()
  }

  /**
   * ComponentDidUpdate lifecycle method.
   * See https://reactjs.org/docs/react-component.html#componentdidupdate for more info.
   * @param {*} prevProps The previous props.
   * @param {*} prevState The previous state.
   * @param {*} snapshot The snapshot.
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      console.log('Component reload (from ' + prevProps.match.params.id + ' to ' + this.props.match.params.id + ').')
      this.getInitialData()
    }
  }

  /**
   * Gets the initial data used by the component.
   */
  getInitialData() {
    GalleriesService.findById(this.props.match.params.id, (error, item) => {
      if (error) {
        console.log(error);
      } else if (item == null) {
        // Gallery not found.
        this.setState({ alertText: `La gallerie qui a pour id ${this.state.match.params.id} n'a pas été trouvée.` });
      } else {
        this.setState({ gallery: item,
          editGallery : {
            name: item.name,
            description: item.description
          }});

        // Get medias
        MediasService.find({ _id: { $in: item.medias } }, (error, items) => {
          if (error) {
            console.log(error);
          } else {
            this.setState({ images: [...items] });
          }
        });
      }
    });
  }

  /**
   * Toggles the modal for editing the gallery.
   */
  toggleEditGalleryModal() {
    this.setState({isEditGalleryFormModalOpen: !this.state.isEditGalleryFormModalOpen})
  }

  /**
   * Triggers the update of the gallery based on the modal for editing the gallery input.
   */
  editGallery() {
    const { updateGalleries } = this.props;
    GalleriesService.update({_id: this.state.gallery._id}, {$set: { name: this.state.editGallery.name, description: this.state.editGallery.description}}, { multi: false, upset: false }, (error, item) => {
      if (error) {
        console.log(error)
      }
      else {
        let gallery = this.state.gallery
        gallery.name = this.state.editGallery.name
        gallery.description = this.state.editGallery.description
        this.setState({gallery: gallery})

        // Dispatch the update of the gallery.
        updateGalleries(gallery)

        this.toggleEditGalleryModal()
      }
    })
  }

  getRandomNumber(maxValue) {
    return Math.floor(Math.random() * Math.floor(maxValue))
  }

  /**
   * Renders the component.
   * See https://reactjs.org/docs/react-component.html#render for more info.
   */
  render() {
    const isAlertVisible = this.state.alertText != '';
    const isEditGalleryEnabled = (this.state.editGallery.name != '' && this.state.editGallery.description != '') && (this.state.editGallery.name != this.state.gallery.name || this.state.editGallery.description != this.state.gallery.description)

    const images = this.state.images.map((image, key) => {
      if (this.getRandomNumber(2) == 1) {
        return (<GalleryVideoComponent {...image} key={key} />)
      }
      else {
        return (<GalleryImageComponent {...image} key={key} />)
      }
    });

    return (
      <div className="animated fadeIn">
        {isAlertVisible && <Alert color="danger">{this.state.alertText}</Alert>}
        <Card>
          <CardHeader>
            <CardTitle>{this.state.gallery.name}</CardTitle>
            <span className='card-actions'><i className="fa fa-pencil-square-o action-icon fa-lg" onClick={this.toggleEditGalleryModal}></i></span>
          </CardHeader>
          <CardBody>
            <CardText><small className="text-muted">Créé le {this.state.gallery.createdAt.toLocaleString('fr-FR')} / Mis à jour le {this.state.gallery.updatedAt.toLocaleString('fr-FR')}</small></CardText>
            <CardText>{this.state.gallery.description}</CardText>
            <section className="media-gallery">
              {images}
            </section>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.isEditGalleryFormModalOpen} toggle={this.toggleEditGalleryModal} className="modal-primary">
          <ModalHeader toggle={this.toggleNewGalleryForm}>Modifier la gallerie</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Nom</Label>
              <Input type="text" id="name" placeholder="Entrez le nom de la gallerie" value={this.state.editGallery.name} onChange={(event) => { let gallery = this.state.editGallery; gallery.name = event.target.value; this.setState({ editGallery: gallery }); }} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input type="text" id="description" placeholder="Entrez la description de la gallerie" value={this.state.editGallery.description} onChange={(event) => { let gallery = this.state.editGallery; gallery.description = event.target.value; this.setState({ editGallery: gallery }); }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editGallery} disabled={!isEditGalleryEnabled}>Modifier la gallerie</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditGalleryModal}>Annuler</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

MediaGallery.propTypes = {
  updateGalleries: PropTypes.func.isRequired
}

export default MediaGallery;
