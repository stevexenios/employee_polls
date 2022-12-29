import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users';
import userReducer from './user';
import questionsReducer from './questions';
import { fetchUsers } from './users';
import { fetchQuestions } from './questions';
// import siteValidation from './Middleware/SiteValidation';
// import notification from './Middleware/Notification';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    questions: questionsReducer,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(siteValidation, notification)
});

store.dispatch(fetchUsers());
store.dispatch(fetchQuestions());

export default store;
