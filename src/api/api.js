import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _saveNewUser,
} from './_DATA';

import { AuthenticationError, UserAlreadyExists } from '../utils/errors';

// export function getInitialData() {
//   return Promise.all([_getUsers, _getQuestions]).then(([users, questions]) => ({
//     users,
//     questions,
//   }));
// }

export function getUsers() {
  return _getUsers();
}

export function getQuestions() {
  return _getQuestions();
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer({ authedUser, qid, answer }) {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}

export function authenticateUserCredentials({ userId, password }, users) {
  // console.log('authenticateUserCredentials: ', { userId, password, users });
  if (users[userId]) {
    if (users[userId].password === password) {
      const response = {
        token: `${users[userId].id}:${users[userId].password}`,
      };
      // console.log('authenticateUserCredentials 2: ', response);
      return response;
    }
    throw new AuthenticationError(
      'Wrong password - Incorrect password entered'
    );
  } else {
    throw new AuthenticationError(
      `Wrong userId - User ${userId} does not exist`
    );
  }
}

export function saveNewUser({ id, password, name }) {
  return Promise.all([_getUsers()]).then(([users]) => {
    // console.log('Current users: ', users);
    if (users[id]) {
      throw new UserAlreadyExists(`Invalid userId - User ${id} already exists`);
    } else {
      return _saveNewUser({ id, password, name });
    }
  });
}
