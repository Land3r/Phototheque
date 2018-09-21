import AbstractDatabaseService from './abstractDatabaseService';

class GalleriesService extends AbstractDatabaseService {
  constructor() {
    super('Galleries');
  }

  addMediasToGallery(medias, galleryQuery, callback) {
    this.find(galleryQuery, (error, item) => {
      if (error) {
        console.log(error);
      } else if (medias instanceof Array) {
        medias = medias.map((media, key) => media._id);
        this.update(galleryQuery, { $addToSet: { medias: { ...medias } } }, { multi: false, upset: false }, callback);
      } else {
        this.update(galleryQuery, { $addToSet: { medias: medias._id } }, { multi: false, upset: false }, callback);
      }
    });
  }

  init() {
    // Index
    this.db.ensureIndex({ fieldName: 'name', unique: true });

    // Sample data
    const gallery =
        this.insert([{
          name: 'Non catégorisé',
          description: 'Cette gallerie regroupe toutes les photos qui n\'appartiennent pas encore à d\'autres galleries',
          medias: [],
        }], (error, items) => {
          console.log('Galleries DB initialized.');
        });
  }

  reset() {
    this.remove({}, { multi: true }, (error, items) => {
      console.log('Galleries DB reset.');
    });
  }
}

export default GalleriesService;
