import React, {Component} from 'react'
import {DefaultAsideContext} from '../../../layouts/DefaultLayout/DefaultAsideContext'

class GalleryImageComponent extends Component {
    constructor(props) {
        super(props)

        this.togglePanel = this.togglePanel.bind(this)

        let name = props.path
        this.state = {
            ...props,

            asidecontext: {
                name: name,
                data: {},
                isPanelOpen: false
            }
        }
    }

    togglePanel() {
        let asidecontext = this.state.asidecontext
        asidecontext.isPanelOpen = !asidecontext.isPanelOpen
        this.setState({asidecontext: asidecontext})
        console.log('Aside context:' + JSON.stringify(asidecontext))
    }

    render() {
        return(
            <DefaultAsideContext.Provider value={this.state.asidecontext}>
                <img src={this.state.path} onClick={this.togglePanel} />
            </DefaultAsideContext.Provider>
        )
    }
}

export default GalleryImageComponent