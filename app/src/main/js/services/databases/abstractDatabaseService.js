import { config } from '../../config/config';

const Datastore = require('nedb');
const path = require('path');

class AbstractDatabaseService {

  constructor(databaseName) {
    const databasePath = path.join(config.DB_PATH, `${databaseName}.db`);
    this.db = new Datastore({ filename: databasePath, autoload: true, timestampData: true });
  }

  insert(element, callback) {
    this.db.insert(element, callback);
  }

  update(query, update, options, callback) {
    this.db.update(query, update, options, callback);
  }

  remove(query, options, callback) {
    this.db.remove(query, options, callback);
  }

  find(element, callback) {
    this.db.find(element, callback);
  }

  findOne(element, callback) {
    this.db.findOne(element, callback);
  }

  findById(id, callback) {
    this.db.findOne({ _id: id }, callback);
  }
}

export default AbstractDatabaseService;
