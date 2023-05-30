import { Img, Item } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ image, setShowModal, setCurrentImg }) => {
  // console.log('image', image);

  const onPictureClick = () => {
    setCurrentImg(image.largeImageURL);
    setShowModal(true);
  };

  return (
    <Item>
      <Img src={image.webformatURL} alt={image.tags} onClick={onPictureClick} />
    </Item>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  setCurrentImg: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
