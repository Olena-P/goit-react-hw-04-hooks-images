import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGalleryInfo from '../ImageGalleryInfo/ImageGalleryInfo';
import Container from '../Container/Container';


export default class App extends Component {
  state = {
    imageName: '',
  };

  handleSearchForm = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchForm} />
        <ImageGalleryInfo
          imageName={imageName}
          currentPage={this.props.currentPage}
        />

        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
