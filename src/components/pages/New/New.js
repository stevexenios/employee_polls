import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/users';
// import { selectQuestions } from '../../redux/questions';
import Questions from '../../features/Questions/Questions';
import './New.css';

const New = () => {
  const newQuestionsTitle = 'Add Question';

  return (
    <div>
      <Questions title={newQuestionsTitle} />
    </div>
  );
};

export default New;
