import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import ImageGallery from '../ImageGallery/ImageGallery';
import pixabayAPI from '../../service/pixabay-api';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { toast } from 'react-toastify';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGalleryInfo extends Component {
  state = {
    images: [],
    status: Status.IDLE,
    error: null,
    currentPage: 1,
    showModal: false,
    largeImageURL: '',
  };

  static propTypes = {
    imageName: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const prevPage = prevState.currentPage;
    const nextPage = this.state.currentPage;

    if (prevName !== nextName) {
      this.setState({ images: [], currentPage: 1 });
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.searchMoreImages(nextName, nextPage);
    }
  }

  searchMoreImages(nextName, nextPage) {
    this.setState({ status: Status.PENDING });

    pixabayAPI
      .fetchImage(nextName, nextPage)
      .then(images => {
        if (images.total === 0) {
          toast.dark('No images. Please try another query!');
          this.setState({ status: Status.REJECTED });

          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => {
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }, 500);
      });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setImgInfo = ({ largeImageURL, tags }) => {
    this.setState({ largeImageURL, tags });
    this.toggleModal();
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, status, alt, largeImageURL, showModal  } = this.state;

    return (
      <>
        {status === Status.IDLE && (
          <div
            style={{
              margin: '20px auto',
              textAlign: 'center',
              fontSize: '20px',
            }}
          >
            Please, enter a query!
          </div>
        )}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} onSetImgInfo={this.setImgInfo} />
            <Button onClickLoadMore={this.onClickLoadMore} />
               {showModal && (
          <Modal onClose={this.toggleModal} src={largeImageURL} alt={alt} />
        )}
          </>
        )}

        {status === Status.PENDING && (
          <div>
            <Loader
              type="Circles"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
        {status === Status.REJECTED && null}
      </>
    );
  }
}

//     if (status === Status.IDLE) {
//       return (
//         <div
//           style={{ margin: '20px auto', textAlign: 'center', fontSize: '20px' }}
//         >
//           Please, enter a query!
//         </div>
//       );
//     }

//     if (status === Status.PENDING) {
//       return (
//         <Loader
//           type="Circles"
//           color="#00BFFF"
//           height={100}
//           width={100}
//           timeout={3000} //3 secs
//         />
//       );
//     }

//     if (status === Status.REJECTED) {
//       return null;
//     }

//     if (status === Status.RESOLVED) {
//       return (
//         <div>
//           <ImageGallery images={images} />
//           <Button onClickLoadMore={this.onClickLoadMore} />
//         </div>
//       );
//     }
//   }
// }
