import {
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SendOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Input, InputProps, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styled, { keyframes, StyledComponent } from 'styled-components';
import Header from '../../Gerenal Components/Header';
import email_pic from './database/email.png';
import emailjs from 'emailjs-com';
import { ReactNode, useRef, useState } from 'react';

export default function ContactMe() {
  const [fullName, setFullName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendFail, setSendFail] = useState(false);
  const [wait, setWait] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [key, setKey] = useState(1);

  const container = useRef<HTMLDivElement>(null);

  function sendEmail() {
    if (!validateFields()) {
      setSendFail(true);
      return;
    }
    const params = { fullname: fullName, subject: subject, email: email, message: message };
    setWait(true);
    emailjs.init('user_u1syzwUILQzU81FQpN5Mf');
    emailjs
      .send('service_h8ik1sm', 'contact_form', params)
      .then((_) => {
        if (container.current) {
          container.current.style.animationPlayState = 'running';
          setTimeout((_) => setKey(key + 1), 2000);
        }
        setFullName('');
        setSubject('');
        setEmail('');
        setMessage('');
        setSendFail(false);
        setWait(false);
      })
      .catch((err) => {
        alert(err);
        setWait(false);
      });
  }

  function validateFields() {
    return (
      fullName.length > 0 &&
      subject.length > 0 &&
      email.length > 0 &&
      message.length > 0 &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    );
  }

  return (
    <>
      <Header />
      <Container key={`c-${key}`} ref={container}>
        <img className='email-pic' src={email_pic} alt='email' />
        <InputC
          value={fullName}
          prefix={<UserOutlined />}
          validate={!sendFail || fullName.length > 0}
          placeholder='Full name'
          onChange={(e) => setFullName(e.target.value)}
        />
        <InputC
          value={subject}
          prefix={<TagOutlined />}
          validate={!sendFail || subject.length > 0}
          placeholder='Subject'
          onChange={(e) => setSubject(e.target.value)}
        />
        <InputC
          value={email}
          type='email'
          prefix={<MailOutlined />}
          validate={!sendFail || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)}
          placeholder='Your email address'
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextAreaC
          value={message}
          dir={rtl ? 'rtl' : 'ltr'}
          placeholder={rtl ? 'متن پیام را اینجا بنویسید' : 'write your messege here'}
          validate={!sendFail || message.length > 0}
          autoSize={{ minRows: 5 }}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className='dir-controls'>
          <Button
            shape='circle'
            size='middle'
            icon={rtl ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            title={rtl ? 'Left to Right' : 'Right to Left'}
            onClick={(_) => setRtl(!rtl)}
          />
        </div>
        <ButtonC icon={<SendOutlined />} onClick={sendEmail}>
          Send
          <Spin style={{ visibility: wait ? 'visible' : 'hidden', marginLeft: 10 }} />
        </ButtonC>
      </Container>
    </>
  );
}

const AnimGoAway = keyframes`
    0% {transform:scale(1) rotate(0deg) translateX(0)}
    60% {transform: scale(0.1) rotate(720deg) translateX(0)}
    70% {transform: scale(0.1) rotate(720deg) translateX(0)}
    100% {transform: scale(0.1) rotate(720deg) translateX(10000px)}
`;

const Container = styled.div`
  position: relative;
  width: 50%;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 30px;
  padding: 20px;
  background-color: #001529;
  animation: ${AnimGoAway} 1s forwards linear paused;
  & img.email-pic {
    display: inline;
    width: 10em;
    height: 10em;
    position: absolute;
    top: 20px;
    right: 20px;
    @media (max-width: 500px) {
      width: 8em;
      height: 8em;
    }
  }
  & .dir-controls {
    height: 0px;
    z-index: 1;
    position: relative;
    top: -46px;
    overflow: visible;
    align-self: flex-end;
    & button {
      margin: 0 3px;
      background-color: #001529;
      color: white;
    }
  }
`;

type InputC_Props = InputProps & { validate: boolean };
const InputC = styled(Input)`
  width: 50%;
  border-radius: 20px;
  height: 2.7em;
  padding: 0 10px 0 2px;
  margin: 10px 0;
  background-color: ${(props: InputC_Props) => (props.validate ? 'white' : '#f59999')};
  & input {
    background-color: ${(props: InputC_Props) => (props.validate ? 'white' : '#f59999')};
    &::placeholder {
      color: ${(props: InputC_Props) => (props.validate ? 'black' : 'white')};
    }
  }
  & .anticon {
    height: 2.2em;
    width: 2.2em;
    padding: 3px;
    border: 2px solid black;
    border-radius: 50%;
    & svg {
      height: 95%;
      width: 95%;
    }
  }
`;

type TextAreaC_Props = InputProps & { validate: boolean };
const TextAreaC = styled(TextArea)`
  width: 100%;
  height: fit-content;
  border-radius: 20px;
  margin: 10px 0;
  padding: 10px;
  background-color: ${(props: TextAreaC_Props) => (props.validate ? 'white' : '#f59999')};
  &::placeholder {
    color: ${(props: InputC_Props) => (props.validate ? 'black' : 'white')};
  }
`;

const ButtonC = styled(Button)`
  width: 30%;
  min-width: fit-content;
  margin: 0 auto;
  background-color: #01203d !important;
  height: fit-content;
  border-radius: 20px;
  color: white !important;
  border-color: white !important;
  font-size: 20px;
  &:hover {
    width: 40%;
    background-color: #03396d !important;
  }
`;
