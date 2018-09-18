let Datastore = require('nedb')
import {config} from '../../config/config'

class AbstractDatabaseService {
    constructor(databaseName) {
        let electron = window.require('electron')
        let fs = electron.remote.require('fs')
        let path = electron.remote.require('path')
        let ipcRenderer  = electron.ipcRenderer
        
        let databasePath = path.join(config.DB_PATH, databaseName + '.db')
        console.log('Using database ' + databasePath + '.')
        this.db = new Datastore({ filename: databasePath, autoload: true, timestampData: true });
    }

    insert(element, callback) {
        this.db.insert(element, callback)
    }

    remove(element, options, callback) {
        this.db.remove(element, options, callback)
    }

    find(element, callback) {
        this.db.find(element, callback)
    }

    findOne(element, callback) {
        this.db.findOne(element, callback)
    }

    findById(id, callback) {
        this.db.findOne({ _id: id}, callback)
    }
}

export default AbstractDatabaseService