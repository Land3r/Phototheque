import AbstractDatabaseService from './abstractDatabaseService';
import GalleriesService from './galleriesService'
import { config } from '../../config/config'

class MediasService extends AbstractDatabaseService {
  constructor() {
    super('Medias');
  }

  //#region Generics 

  init() {
    // Index
    this.db.ensureIndex({ fieldName: 'path', unique: true });

    console.log('Medias DB initialized.');
  }

  reset() {
    this.remove({}, { multi: true }, (error, items) => {
      console.log('Medias DB reset.');
    });
  }

  //#endregion Generics

  /**
   * Inserts or updates a media. Uses the media.path to make items matches.
   * @param {*} media The media element to insert or update into the database.
   */
  insertOrUpdate(media) {
    console.log(media)
    this.findOne({ path: media.path }, (error, item) => {
      if (error) {
        console.log(error)
      } else if (item == null) {
        console.log(`Media ${media.path} was not found on db; Creating.`)
        // Media doesn't exists, it will be created.
        this.insert(media, (error, item) => {
          if (error) {
            console.log(error)
          } else {
            // Media created successfully; Inserting it into default gallery.
            GalleriesService.addMediasToGallery(item, { name: config.DEFAULT_GALLERY }, (error, numberOfItems, upsets) => {
              if (error) {
                console.log(error)
              } else {
                // Media inserted into default gallery.
              }
            })
          }
        })
      } else {
        // Media already exists; it will be updated and not inserted into the default gallery.
        this.update({ _id: item._id }, { $set: { exif: media.exifData } }, { multi: false, upsert: false }, (error, numberOfItems, upsets) => {
          if (error) {
            console.log(error)
          } else {
          }
        })
      }
    })
  }
}

export default new MediasService();
