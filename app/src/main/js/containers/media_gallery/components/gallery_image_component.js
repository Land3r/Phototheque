import { connect } from 'react-redux';
import { setMedia } from '../../../stores/media/actions';
import GalleryImageComponent from '../../../views/MediaGallery/Components/GalleryImageComponent';

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => ({
  setSidePanelItem: (item) => {
    dispatch(setMedia(item));
  },
});

/*
 Here we are creating a Higher order component
 https://facebook.github.io/react/docs/higher-order-components.html
 */
export default connect(mapStateToProps, mapDispatchToProps)(GalleryImageComponent);
