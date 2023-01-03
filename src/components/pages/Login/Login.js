import './Login.css';
// import PropTypes from 'prop-types'; // ES6
import { Modal } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import {
  setUserId,
  setUserToken,
} from '../../../redux/user';
import { useAction } from '../../../hooks';
import CreateUserForm from './CreateUserForm';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../../redux/users';

const Login = (props) => {
  const { setAuth } = useAuth();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  
  const userRef = useRef();
  const errorRef = useRef();

  const { authenticateUser, saveNewUserAsync } = useAction();
  const [userId, setLoginUserId] = useState('');
  const [password, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [toggle, setToggle] = useState('password');
  const [enableModal, setEnableModal] = useState(false);
  const [disableLoginButton, setDisableLoginButton] = useState(true);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');
  }, [userId, password]);
  
  useEffect(() => {
    if (!userId || !password) {
      setDisableLoginButton(true);
    } else {
      setDisableLoginButton(false);
    }
  }, [userId, password]);

  const renderErrorMessage = (name) => {
    return <section><p ref={errorRef} className="error" aria-live="assertive">{errorMessage}</p></section>;
  };

  const disableModal = () => {
    setEnableModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // { token, error }
    const response = await authenticateUser({
      userId,
      password,
    });

    const { payload, error } = response;

    if (!payload || !payload.token) {
      const { name: errorName, message: errorMessage } = error;
      setErrorMessage(`${errorName}: ${errorMessage}`);
    } else {
      dispatch(setUserId(userId));
      dispatch(setUserToken(payload.token));
      dispatch(fetchUsers());
      setAuth({ userId, password, token: payload.token });
      navigate(from, { replace: true });
    }
  };

  const handleSubmitCreateData = ({ id, password, name }) => {
    saveNewUserAsync({ id, password, name }); //  no await
    dispatch(fetchUsers());
    disableModal();
  };

  const renderForm = (
    <>
      <div className="employee-polls-h1">
        <h1>employee polls</h1>
        <p className="polls-text">Create & respond to polls to earn points</p>
      </div>
      <div className="login-form-wrap">
        <h2 className="employee-polls-h2">Log Into</h2>
        <h2 className="employee-polls-h2">Employee Polls</h2>
        <Modal
          title="Create New User"
          open={enableModal}
          onCancel={disableModal}
          okButtonProps={{ style: { display: 'none' } }}
        >
          <CreateUserForm handleSubmitCreateData={handleSubmitCreateData} />
        </Modal>
        <form className="login-form" onSubmit={handleSubmit}>
          <p>
            {/* <label>{USER_NAME} </label> */}
            <input
              className="login-input"
              type="text"
              id="userId"
              ref={userRef}
              name="userId"
              placeholder="userId (e.g. mtsamis)"
              required
              onChange={(e) => setLoginUserId(e.target.value)}
            />
          </p>
          <p>
            {/* <label>{PASSWORD} </label> */}
            <input
              className="login-input"
              type={toggle}
              id="password"
              ref={userRef}
              name="password"
              placeholder="password (e.g. xyz123)"
              required
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </p>
          <div className="error-message">
            {errorMessage && renderErrorMessage(errorMessage)}
          </div>
          <label className="login-input-checkbox">
            Show Password
            <input
              type="checkbox"
              onClick={() =>
                toggle === 'text' ? setToggle('password') : setToggle('text')
              }
            />
            <span className="checkmark"></span>
          </label>
          <p>
            <input
              type="button"
              id="create"
              value="Create"
              className="create-user-button"
              onClick={() => {
                setErrorMessage('');
                setEnableModal(true);
              }}
            />
            <input
              type="submit"
              id="login"
              value="Login"
              className="submit-button"
              disabled={disableLoginButton}
            />
          </p>
        </form>
      </div>
    </>
  );

  return renderForm;
};

// LoginScreen.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

export default Login;
