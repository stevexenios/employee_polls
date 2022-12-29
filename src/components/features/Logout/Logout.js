import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setUserId,
  setUserToken,
} from '../../../redux/user';

const customStyleLogout = {
  color: 'var(--mwangiColor3Text)',
  fontSize: '20px',
  justifyContent: 'flex-end',
};

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearUser = () => {
      dispatch(setUserId(''));
      dispatch(setUserToken(''));
  };

  return (
    <Button
      icon={<LogoutOutlined style={customStyleLogout} />}
      type='text'
      onClick={() => {
        clearUser();
        navigate('/login');
      }}
      size='large'
    />
  );
};

export default Logout;
