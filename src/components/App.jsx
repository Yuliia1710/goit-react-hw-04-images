import React, { useState } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { AppWrap } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [arrayOfImg, setArrayOfImg] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const addImgLink = link => {
  //   setCurrentImg(link);
  // };

  async function getFromApi(text, numPage) {
    const API_KEY = `35078540-2c141ef0988cb1d0018a14385`;
    const BASE_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    });

    const URL = `${BASE_URL}?key=${API_KEY}&q=${text}&page=${numPage}&${searchParams}`;

    try {
      setIsLoading(true);
      const response = await axios.get(URL);

      if (response.data.totalHits < 1) {
        toast.error(`За запитом "${this.state.query}" результатів нема!`);
        setQuery('');
        setPage(1);
        setShowButton(false);
        return;
      } else if (response.data.hits.lenght !== 0) {
        setArrayOfImg(prev => [...prev, ...response.data.hits]);
      }
      let totalNumberOfImages = response.data.totalHits;
      let alredyDownloadImages = 12 * page;

      if (alredyDownloadImages < totalNumberOfImages) {
        if (page === 1) {
          toast(
            `За запитом "${query}" знайдено картинок: ${totalNumberOfImages}. Натисни "завантажити ще", щоб отримати ще 12 картинок!`
          );
        } else {
          console.log('наступний запит');
          const moreImages = totalNumberOfImages - alredyDownloadImages;
          toast(
            `За запитом "${query}" лишилося ще картинок: ${moreImages} із ${totalNumberOfImages}. Натисни "завантажити ще", щоб отримати ще 12 картинок!`
          );
        }
        setShowButton(true);
      } else {
        toast(
          `Це всі результати за запитом "${query}". Більше результатів немає!`
        );
        setShowButton(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmitForm = text => {
    setQuery(text);
    setArrayOfImg([]);
    setPage(1);
    getFromApi(text, 1);
  };

  const onButtonClick = () => {
    getFromApi(query, page + 1);
    getFromApi(prev => prev + 1);
  };

  // const togleModal = () => {
  //   setShowModal(!showModal);
  //   setShowModal(!showModal);
  // };
  // const onSubmitSearchBtn = toFind => {
  //   if (toFind === query) {
  //     toast(`ви повторно намагаєтесь знайти картинки про: "${toFind}"!`);
  //     return;
  //   }
  //   setArrayOfImg([]);
  //   setPage(1);
  //   setQuery(toFind);
  //   getFromAPI(toFind, 1);
  // };

  return (
    <AppWrap>
      <ToastContainer autoClose={1000} />
      <Searchbar onSubmit={onSubmitForm} />
      {isLoading && <Loader />}
      {showModal && (
        <Modal currentImg={currentImg} setShowModal={setShowModal} />
      )}

      {arrayOfImg.length > 0 && (
        <ImageGallery
          images={arrayOfImg}
          setCurrentImg={setCurrentImg}
          setShowModal={setShowModal}
        />
      )}
      {showButton && <Button onClick={onButtonClick} />}
      {showModal && (
        <Modal currentImg={currentImg} setShowModal={setShowModal} />
      )}
    </AppWrap>
  );
};

export default App;
