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
