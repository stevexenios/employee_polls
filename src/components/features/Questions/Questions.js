import './Questions.css';
import LeaderboardSvgFilled from '../../../assets/svg/LeaderboardSvgFilled';
import {
  CheckOutlined,
  QuestionOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Divider } from 'antd';
import Question from '../Question/Question';
import Add from '../Add/Add';
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable';

const iconStyling = { color: 'var(--mwangiColor3Text)', fontSize: '30px' };
const iconClassName = 'icon-custom';
const iconGetter = {
  'Add Question': () => (
    <PlusOutlined style={iconStyling} className={iconClassName} />
  ),
  'Unanswered Questions': () => (
    <QuestionOutlined style={iconStyling} className={iconClassName} />
  ),
  'Answered Questions': () => (
    <CheckOutlined style={iconStyling} className={iconClassName} />
  ),
  Leaderboard: () => (
    <LeaderboardSvgFilled style={iconStyling} className={iconClassName} />
  ),
  default: (title) => {
    throw Error(`No Icon named '${title}'!`);
  },
};

const Questions = ({ title, questions }) => {
  return (
    <div className="poll-container">
      <Divider>
        <span>
          {(iconGetter[title] || iconGetter.default)()}
          <h3>{title}</h3>
        </span>
      </Divider>
      <div className="div-inner-container">
        {questions &&
          questions.map((q, i) => {
            return (
              <Question
                questionId={q}
                key={i}
                styling={
                  title === 'Unanswered Questions' ? 'unanswered' : 'answered'
                }
              />
            );
          })}
        {title === 'Add Question' && <Add />}
        {title === 'Leaderboard' && <LeaderboardTable />}
      </div>
    </div>
  );
};

export default Questions;
