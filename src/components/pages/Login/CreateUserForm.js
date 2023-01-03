/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../redux/users';
import { selectUsersError } from '../../../redux/users';
import { Alert } from 'antd';

const CreateUserForm = (props) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const errors = useSelector(selectUsersError);

  const renderErrorOnCreateUser = () => {
    if (errors && errors.message) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  useEffect(() => {
    renderErrorOnCreateUser();
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmitCreateData({
      id: userId,
      password: userPassword,
      name: `${firstName} ${lastName}`,
    });
    dispatch(fetchUsers);
  };

  return (
    <div>
      {showAlert && (
        <Alert
          message="Error"
          description={errors?.message}
          type="error"
          showIcon
          closable
          banner={true}
          data-testid="error-header"
        />
      )}
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div>
          <p>
            <input
              className="login-input"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              required
              onChange={(e) => setFirstName(e.target.value)}
              data-testid="first-name-input"
            />
          </p>
          <p>
            <input
              className="login-input"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              required
              onChange={(e) => setLastName(e.target.value)}
              data-testid="last-name-input"
            />
          </p>
          <p>
            <input
              className="login-input"
              type="text"
              id="userId"
              name="userId"
              placeholder="Enter your user Id"
              required
              onChange={(e) => setUserId(e.target.value)}
              data-testid="user-id-input"
            />
          </p>
          <p>
            <input
              className="login-input"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setUserPassword(e.target.value)}
              data-testid="password-input"
            />
          </p>
          <p>
            <input
              type="submit"
              id="create"
              value="Create User"
              className="submit-button"
              data-testid="create-submit-button"
            />
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
