import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, setShowModal, setCurrentImg }) => {
  return (
    <Gallery className="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          setShowModal={setShowModal}
          setCurrentImg={setCurrentImg}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setCurrentImg: PropTypes.func.isRequired,
};
