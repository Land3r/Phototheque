import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { DefaultPlayer as Video } from 'react-html5video';
import '../../../../../../../node_modules/react-html5video/dist/styles.css'

class GalleryVideoComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ...props
        }
    }

    /**
      * Render lifecycle method.
      * See https://reactjs.org/docs/react-component.html#render for more info.
      */
    render() {
        return(
        <Video autoPlay={false} loop={true} muted={true} controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}>
            <source src={this.props.path} type="video/mp4" />
        </Video>
        )
    }
}

export default GalleryVideoComponent