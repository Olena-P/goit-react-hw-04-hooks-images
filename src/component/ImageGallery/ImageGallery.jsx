import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export default function ImageGallery({ images, onSetImgInfo }) {
  return (
    <List>
      {images &&
        images.map(image => {
          return (
            <ImageGalleryItem
              src={image.webformatURL}
              alt={image.tags}
              largeImageURL={image.largeImageURL}
              key={image.id}
              onSetImgInfo={onSetImgInfo}
            />
          );
        })}
    </List>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
