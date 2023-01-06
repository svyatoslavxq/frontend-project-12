import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';
import AddModal from './AddModal';
import { closeModal } from '../../../slices/modalSlice';

const HomePageModals = ({ type, currentChannelID }) => {
  const dispatch = useDispatch();

  const showModal = () => dispatch(closeModal());

  if (!type) return null;

  return (
    <Modal centered show onHide={showModal}>
      {type === 'removing' && <RemoveModal currectChannelID={currentChannelID} />}
      {type === 'renaming' && <RenameModal />}
      {type === 'adding' && <AddModal />}
    </Modal>
  );
};

export default HomePageModals;
