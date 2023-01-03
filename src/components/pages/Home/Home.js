/* eslint-disable react-hooks/exhaustive-deps */
import './Home.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Questions from '../../features/Questions/Questions';
import { fetchUsers, selectUser } from '../../../redux/users';
import { selectQuestions, fetchQuestions } from '../../../redux/questions';
import {Button, Space} from 'antd';

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const questions = useSelector(selectQuestions);
  const unansweredPollTitle = 'Unanswered Questions';
  const answeredPollTitle = 'Answered Questions';
  const [answered, setAnswered] = useState([]);
  const [unanswered, setUnanswered] = useState([]);

  // Display toggle 
  const [showUnanswered, setShowUnanswered] = useState(true);
  const [showAnswered, setShowAnswered] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    // console.log('User: ', user);
    if (user?.answers) {
      const tempAnswered = Object.keys(user.answers);
      setAnswered(tempAnswered);

      const allQuestions = Object.values(questions).sort((q1, q2) => q2.timestamp - q1.timestamp);
      let tempUnanswered = new Set();
      allQuestions.forEach((q) => {
        if (!user.answers[q.id]) {
          tempUnanswered.add(q.id);
        }
      });
      tempUnanswered = Array.from(tempUnanswered);
      setUnanswered(tempUnanswered);
    }
  }, [user, questions]);

  const displayUnanswered = () => {
    setShowUnanswered(true);
    setShowAnswered(false);
  };

  const displayAnswered = () => {
    setShowUnanswered(false);
    setShowAnswered(true);
  };  

  const displayBoth = () => {
    setShowUnanswered(true);
    setShowAnswered(true);
  };

  return (
    <div>
      <section className='button-group'>
        <Space size='large' align='center'>
          <Button shape='round' size='large' onClick={displayUnanswered} disabled={showUnanswered && !showAnswered}>Show Unanswered</Button>
          <Button shape='round' size='large' onClick={displayBoth} disabled={showAnswered && showUnanswered}>Show Both</Button>
          <Button shape='round' size='large' onClick={displayAnswered} disabled={showAnswered && !showUnanswered}>Show Answered</Button>
        </Space>
      </section>
      {showUnanswered && <Questions title={unansweredPollTitle} questions={unanswered} />}
      {showAnswered && <Questions title={answeredPollTitle} questions={answered} />}
    </div>
  );
};

export default Home;
