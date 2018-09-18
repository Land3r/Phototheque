import * as fs from 'fs'
import * as path from 'path'

const {dialog} = window.require('electron').remote

/**
 * Service for dealing with files and folders.
 */
class FileService {
    constructor() {

    }

    /**
     * Opens a 'Open directory' dialog from electron.
     */
    showOpenFolder() {
        return dialog.showOpenDialog({properties: ['openDirectory']})
    }

    /**
     * Opens a dialog from electron.
     * @param {*} properties The dialog properties. See https://electronjs.org/docs/api/dialog for more info.
     */
    showOpenDialog(properties) {
        return dialog.showOpenDialog({properties: properties})
    }

    /**
     * Explores recursively a folder to get all files inside it.
     * @param {*} directory The folder to recursively explore.
     * @param {*} condition The condition for the filename to match in order to be included in the results. 
     * @param {*} currentResult The current result stack (recursively created).
     */
    readFolder(directory, condition, currentResult) {
        let files = fs.readdirSync(directory)
        currentResult = currentResult || []
        files.forEach((file) => {
            if (fs.statSync(path.join(directory, file)).isDirectory()) {
                currentResult = this.readFolder(path.join(directory, file), condition, currentResult)
            }
            else {
                if (condition(file)) {
                    currentResult.push(path.join(directory, file))
                }
                else {
                    console.log('File ' + path.join(directory, file) + ' has not a recognized file type.')
                }
            }
        })
        return currentResult
    }
}

export default FileService