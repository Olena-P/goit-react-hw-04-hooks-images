import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  src,
  largeImageURL,
  tags = "",
  onSetImgInfo
}) => {
    return (
      <Item>
        <Image
          src={src}
          alt={tags}
          onClick={() => {
          onSetImgInfo({ largeImageURL, tags });
        }}/>

     
      </Item>
    );

};

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onSetImgInfo: PropTypes.func.isRequired,
};
  
export default ImageGalleryItem