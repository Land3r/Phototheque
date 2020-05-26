import AbstractDatabaseService from './abstractDatabaseService';

class FoldersService extends AbstractDatabaseService {
  constructor() {
    super('Folders');
  }

  init() {
    // Index
    this.db.ensureIndex({ fieldName: 'directory', unique: true });

    // No Sample data
    console.log('Folders DB initialized.');
  }

  reset() {
    this.remove({}, { multi: true }, (error, items) => {
      console.log('Folders DB reset.');
    });
  }
}

export default new FoldersService();
