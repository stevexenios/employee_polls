import './UserProfile.css';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { selectUserId } from '../../../redux/user';

const customStyle = { color: 'var(--mwangiColor3Text)', fontSize: '20px' };

const UserProfile = () => {
    const loggedInUserId = useSelector(selectUserId);

    return (
        <span className='user-profile'>
            <UserOutlined style={customStyle} size='large'/>
            <h3>Welcome <i>{loggedInUserId}</i>!</h3>
        </span>
    );

};

export default UserProfile;