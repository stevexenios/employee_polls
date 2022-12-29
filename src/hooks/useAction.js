import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { allActions } from '../redux/allActions';

const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
export default useAction;
