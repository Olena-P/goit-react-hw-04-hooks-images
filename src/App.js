import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./component/Searchbar";
import ImageGalleryInfo from "./component/ImageGalleryInfo";
import Container from "./component/Container";
import "./App.css";

export default class App extends Component {
  state = {
    imageName: "",
  };

  handleSearchForm = (imageName) => {
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
