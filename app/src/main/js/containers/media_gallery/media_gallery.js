import { connect } from 'react-redux';
import { updateGalleries } from '../../stores/galleries/actions';
import MediaGallery from '../../views/MediaGallery/MediaGallery';

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => ({
  updateGalleries: (item) => {
    dispatch(updateGalleries(item));
  },
});

/*
 Here we are creating a Higher order component
 https://facebook.github.io/react/docs/higher-order-components.html
 */
export default connect(mapStateToProps, mapDispatchToProps)(MediaGallery);
