import { connect } from 'react-redux';
import GalleryList from '../../views/MediaGallery/GalleryList';

/*
 This is a redux specific function.
 What is does is: It gets the state specified in here from the global redux state.
 For example, here we are retrieving the list of items from the redux store.
 Whenever this list changes, any component that is using this list of item will re-render.
 */
function mapStateToProps(state) {
  return {
    galleries: state.galleries.galleries,
    folders: state.folders.folders
  }
}

/*
 Here we are creating a Higher order component
 https://facebook.github.io/react/docs/higher-order-components.html
 */
export default connect(mapStateToProps)(GalleryList);
