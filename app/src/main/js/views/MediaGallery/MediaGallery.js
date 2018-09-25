import React, { Component, Fragment } from 'react';
import { Alert, Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle, Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';

import GalleryImageComponent from './../../containers/media_gallery/components/gallery_image_component';

import GalleriesService from '../../services/databases/galleriesService';
import MediasService from '../../services/databases/mediasService';

class MediaGallery extends Component {
  constructor(props) {
    super(props);

    this.getInitialData = this.getInitialData.bind(this);
    this.toggleEditGalleryModal = this.toggleEditGalleryModal.bind(this);
    this.editGallery = this.editGallery.bind(this)

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

    this.getInitialData();
  }

  getInitialData() {
    const galleriesService = new GalleriesService();
    galleriesService.findById(this.state.match.params.id, (error, item) => {
      if (error) {
        console.log(error);
      } else if (item == null) {
        // Gallery not found.
        this.setState({ alertText: `La gallerie qui a pour id ${this.state.match.params.id} n'a pas été trouvée.` });
      } else {
        this.setState({ gallery: item });

        // Get medias
        const mediasService = new MediasService();
        mediasService.find({ _id: { $in: item.medias } }, (error, items) => {
          if (error) {
            console.log(error);
          } else {
            const images = this.state.images;
            images.push(...items);
            this.setState({ images });
          }
        });
      }
    });
  }

  toggleEditGalleryModal() {
    this.setState({isEditGalleryFormModalOpen: !this.state.isEditGalleryFormModalOpen})
  }

  editGallery() {
    console.log(this.state.editGallery)
  }

  render() {
    const isAlertVisible = this.state.alertText != '';
    const isEditGalleryEnabled = this.state.editGallery.name != '' && this.state.editGallery.description != '' && this.state.editGallery.name != this.state.gallery.name && this.state.editGallery.description != this.state.gallery.description

    const images = this.state.images.map((image, key) => (<GalleryImageComponent {...image} key={key} />));

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

export default MediaGallery;
