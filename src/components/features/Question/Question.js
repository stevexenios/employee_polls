import { useEffect, useState } from 'react';
import { fetchUsers } from '../../../redux/users';
import {
  selectQuestions,
  saveAnsweredQuestion,
  fetchQuestions,
} from '../../../redux/questions';
import { useDispatch, useSelector } from 'react-redux';
import QuestionsSummary from '../QuestionSummary/QuestionSummary';
import './Question.css';

const Question = ({ questionId, styling }) => {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    setQuestion(questions[questionId]);
  }, [questions]);

  const reInitializeStore = ({ authedUser, qid, answer }) => {
    dispatch(saveAnsweredQuestion({ authedUser, qid, answer }));
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  };

  return (
    <QuestionsSummary
      restore={reInitializeStore}
      question={question}
      styling={styling}
    />
  );
};

export default Question;
