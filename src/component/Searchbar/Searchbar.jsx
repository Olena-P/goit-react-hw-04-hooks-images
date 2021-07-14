import { Component } from 'react';
// import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.error('Please, enter something!');
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormLabel>
              {/* <ImSearch style={{ marginRight: 8 }} /> */}
            </SearchFormLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            name="imageName"
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
            value={this.state.imageName}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}
