import { Avatar, Typography } from 'antd';
import { selectUser } from '../../../redux/users';
import { useSelector } from 'react-redux';

const User = () => {
  const currentUser = useSelector(selectUser);

  return (
    <div>
      <Avatar
        size="large"
        style={{
          color: '#4c0ca0',
          backgroundColor: '#ddcfe6',
          borderColor: '#4c0ca0',
        }}
      >
        {currentUser.id.toUpperCase()}
      </Avatar>
    </div>
  );
};

export default User;
