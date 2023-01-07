import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';
import AddModal from './AddModal';
import { closeModal, modalSelector, modalTypes } from '../../../slices/modalSlice';

const HomePageModals = ({ currentChannelID }) => {
  const dispatch = useDispatch();
  const { type } = useSelector(modalSelector);
  const hideModal = () => dispatch(closeModal());

  return (
    <Modal centered show={Boolean(type)} onHide={hideModal}>
      {type === modalTypes.removing && <RemoveModal currectChannelID={currentChannelID} />}
      {type === modalTypes.renaming && <RenameModal />}
      {type === modalTypes.adding && <AddModal />}
    </Modal>
  );
};

export default HomePageModals;
