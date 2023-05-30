import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Header,
  Input,
  SearchForm,
  SearchButton,
  ButtonLabel,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChangeInput = event => {
    setQuery(event.currentTarget.value);
  };

  const onSubmitForm = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.warning('Запит не введено! Спробуйте ще раз!');
      setQuery('');
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <Header>
      <ToastContainer autoClose={1000} />
      <SearchForm onSubmit={onSubmitForm}>
        <SearchButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
          value={query}
        />
      </SearchForm>
    </Header>
  );
};

export default Searchbar;

// перевірка propTypes
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
