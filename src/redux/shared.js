import store from './store';
import { fetchUsers } from './users';
import { fetchQuestions } from './questions';
// import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function handleInitialData() {
  // store.dispatch(showLoading());
  store.dispatch(fetchUsers);
  store.dispatch(fetchQuestions);
  // store.dispatch(hideLoading());
}