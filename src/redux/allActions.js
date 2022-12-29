import { userSlice } from './user';
import { usersSlice } from './users';
import { questionsSlice } from './questions';

export const allActions = {
  ...userSlice.actions,
  ...userSlice.thunks,
  ...usersSlice.actions,
  ...usersSlice.thunks,
  ...questionsSlice.actions,
  ...questionsSlice.thunks,
};
