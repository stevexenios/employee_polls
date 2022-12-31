import './App.css';
import Layout from './components/Layout';
import Home from './components/pages/Home/Home';
import New from './components/pages/New/New';
import Leaderboard from './components/pages/Leaderboard/Leaderboard';
import Error from './components/pages/Error/Error';
import Login from './components/pages/Login/Login';
import RequireAuth from './components/features/RequireAuth/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  selectUserId,
  selectUserToken,
} from './redux/user';
import Nav from './components/features/Nav/Nav';
import QuestionDetails from './components/pages/QuestionDetails/QuestionDetails';

const App = (props) => {
  const loggedInUserId = useSelector(selectUserId);
  const loggedInUserToken = useSelector(selectUserToken);

  return (
    <Fragment>
     
      {/* Protected Nav bar */}
      {loggedInUserId && loggedInUserToken ? <Nav /> : null}      

      <Routes>
        <Route path="/" exact element={<Layout />}>
          
          {/* Public routes */}
          <Route path="/login" exact element={<Login />} />
          
          {/* Protected routes */}
          <Route element={<RequireAuth />} >
              <Route path="/" exact element={<Home />} />
              <Route path="/home" exact element={<Home />} />
              <Route path="/new" exact element={<New />} />
              <Route path="/leaderboard" exact element={<Leaderboard />} />
              <Route path="/questions/:question_id" exact element={<QuestionDetails />} />
          </Route>

          {/* Catch all */}
          <Route path="*" exact element={<Error />} />
        
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
