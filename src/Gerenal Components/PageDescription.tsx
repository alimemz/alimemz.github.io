import { CloseOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components/macro';
import page_descs from './database/pages_descriptions.json';

export default function PageDescription() {
  const [showModal, setShowModal] = useState(true);
  const location = useLocation();

  const pair = Object.entries(page_descs).find((pair) => pair[0] === location.pathname.substring(1));
  const data = pair ? pair[1] : '';

  if (!data) return <></>;
  return (
    <ModalC
      visible={showModal}
      destroyOnClose
      onCancel={() => setShowModal(false)}
      closable={false}
      footer={null}
      title='This page shows that I can:'
      cancelText='Close'>
      <CloseOutlined onClick={() => setShowModal(false)} />
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </ModalC>
  );
}

const ModalC = styled(Modal)`
  position: relative;
  max-width: max-content;
  min-width: 370;
  padding-bottom: 0;
  & .ant-modal-header {
    background-color: #03396d;
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-left: 10px;
    & > * {
      color: white;
    }
  }

  & .ant-modal-body {
    background-color: #83b3e0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: none;
    padding: 20px;
    & ul {
      list-style-type: '\\25C9';
      padding: 0;
      & li {
        padding: 0 10px 10px;
      }
    }
  }
  & span.anticon {
    background-color: #630101;
    color: white;
    border-radius: 50%;
    width: fit-content;
    height: fit-content;
    padding: 5px;
    position: absolute;
    top: -8px;
    right: -8px;
    cursor: pointer;
    & svg {
      height: 100%;
      width: 100%;
    }
  }

  & .ant-modal-content {
    border-radius: 10px;
    border: 3px solid white;
  }
`;
