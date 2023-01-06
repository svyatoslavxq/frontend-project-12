/* eslint-disable max-len */
import { React } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, modalSelector } from '../../../slices/modalSlice';
import { currentChannelsSelector, updateAfterRemove } from '../../../slices/channelsSlice';
import { useApi } from '../../../contexts/SocketContext';
import { useToastify } from '../../../contexts/ToastifyContext';

const RemoveModal = ({ currectChannelID }) => {
  const { successToast } = useToastify();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { deleteChannel } = useApi();
  const { item } = useSelector(modalSelector);

  const currentChannel = useSelector((state) => currentChannelsSelector(state, item));

  const handleRemove = () => {
    deleteChannel(currentChannel);
    dispatch(closeModal());
    successToast(t('removeChannelToast'));
    dispatch(updateAfterRemove({ currectChannelID, currentChannelID: currentChannel.id }));
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.questionRemove')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => dispatch(closeModal())} type="button" variant="secondary" className="me-2">{t('modal.cancelButton')}</Button>
          <Button onClick={handleRemove} type="button" variant="danger">{t('modal.removeButton')}</Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveModal;
