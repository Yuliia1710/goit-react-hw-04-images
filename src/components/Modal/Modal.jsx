import { Overlay, ModalWraper, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ currentImg, setShowModal }) => {
  useEffect(() => {
    // обробник слухача якщо натиснута кнопка Escape - демонтуємо модалку
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        setShowModal(false);
      }
    };
    // коли монтується модалка, чіпляємо слухача на натискання кнопок із обробником hanleKeyDown
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // коли демонтується модалка, чіпляємо очистку слухача на натискання кнопок із обробником hanleKeyDown
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowModal]);

  const handleOverlayClick = event => {
    const { currentTarget, target } = event;
    if (currentTarget === target) {
      setShowModal(false);
    }
  };

  return createPortal(
    <div>
      <Overlay onClick={handleOverlayClick}>
        <ModalWraper>
          <ModalImg src={currentImg} alt="" />
        </ModalWraper>
      </Overlay>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  currentImg: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
