import { Component } from "react";
// import { ImSearch } from 'react-icons/im';
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    imageName: "",
  };

  handleNameChange = (event) => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.imageName.trim() === "") {
      toast.error("Please, enter something!");
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>
              {/* <ImSearch style={{ marginRight: 8 }} /> */}
            </span>
          </button>
          <input
            type="text"
            name="imageName"
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
            className={s.SearchFormInput}
            value={this.state.imageName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
