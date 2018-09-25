import React, { Component } from 'react'

import foldersService from '../services/databases/foldersService'
import galleriesService from '../services/databases/galleriesService'
import mediasService from '../services/databases/mediasService'

class StoreInitializer extends Component {
    constructor(props) {
        super(props)

        this.getInitialData = this.getInitialData.bind(this)

        this.state = {
            isLoaded: false
        }
    }

    getInitialData() {
        if (!this.state.isLoaded) {

            
            // this.setState({isLoaded: true})
        }
    }

    render() {
        return null
    }
}

export default StoreInitializer