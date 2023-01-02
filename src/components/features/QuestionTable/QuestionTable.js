import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { selectUser, selectTotalUsers, fetchUsers } from '../../../redux/users';
import { fetchQuestions, saveAnsweredQuestion } from '../../../redux/questions';
import { useSelector, useDispatch } from 'react-redux';
import errorHandler from '../../../utils/errorHandler';

const QuestionTable = ({ question, styling, disableOnModal = false }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectUser);
  const totalEmployees = useSelector(selectTotalUsers);
  const [isAnswered, setIsAnswered] = useState(false);
  const [data, setData] = useState([]);
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionSelected, setOptionSelected] = useState('');
  const [confirmedText, setConfirmedText] = useState('');

  useEffect(() => {
    if (question) {
      setOptionOne(question.optionOne.text);
      setOptionTwo(question.optionTwo.text);
    }
    if (question.optionOne.votes.includes(currentUser.id)) {
      setOptionSelected('optionOne');
    } else if (question.optionTwo.votes.includes(currentUser.id)) {
      setOptionSelected('optionTwo');
    }
  }, [question]);

  useEffect(() => {
    setIsAnswered(styling === 'answered');
  }, [styling]);

  const refreshStore = () => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  };

  const submitAnsweredQuestion = ({ authedUser, qid, answer }) => {
      dispatch(saveAnsweredQuestion({ authedUser, qid, answer }));
      refreshStore();
  };

  const extractTableOptions = () => [
    {
      key: 'optionOne',
      'selection-option': optionOne,
      'selected-count': `${question?.optionOne?.votes.length} ${
        question?.optionOne?.votes.length === 1 ? 'employee' : 'employees'
      }`,
      'selected-percent': `${
        (100 * question?.optionOne?.votes.length) / totalEmployees
      } %`,
    },
    {
      key: 'optionTwo',
      'selection-option': optionTwo,
      'selected-count': `${question?.optionTwo?.votes.length} ${
        question?.optionTwo?.votes.length === 1 ? 'employee' : 'employees'
      }`,
      'selected-percent': `${
        (100 * question?.optionTwo?.votes.length) / totalEmployees
      } %`,
    },
  ];

  useEffect(() => {
    const tempData = extractTableOptions();
    setData(tempData);
  }, [optionOne, optionTwo]);

  const handleWouldYouRather = (text) => {
    setIsAnswered(true);
    let answer = '';
    setConfirmedText(text);
    if (text && (optionOne || optionTwo)) {
      if (text === optionOne) {
        setOptionSelected('optionOne');
        answer = 'optionOne';
      } else if (text === optionTwo) {
        setOptionSelected('optionOne');
        answer = 'optionTwo';
      } else {
        errorHandler(
          `Text mismatch with options: text='${text}', optionOne='${optionOne}' or optionTwo='${optionTwo}'.`
        );
      }
      const authedUser = currentUser?.id;
      const qid = question?.id;
      submitAnsweredQuestion({ authedUser, qid, answer });
    } else {
      errorHandler(
        `Invalid value for either: text='${text}', optionOne='${optionOne}' or optionTwo='${optionTwo}'.`
      );
    }
  };

  // In the fifth row, other columns are merged into first column
  // by setting it's colSpan to be 0
  const sharedOnCell = (_, index) => {
    if (!isAnswered) {
      return {
        colSpan: 0,
      };
    }
    return {};
  };

  const determineButtonClass = (text) => {
    if (confirmedText === text) {
      return 'selection-option-button-answered';
    } else if (
      (text === optionOne && optionSelected === 'optionOne') ||
      (text === optionTwo && optionSelected === 'optionTwo')
    ) {
      return 'selection-option-button-answered';
    }
    return 'selection-option-button-unanswered';
  };

  const renderButtonAndText = (text) => (
    <Button
      disabled={isAnswered || disableOnModal}
      className={
        isAnswered
          ? determineButtonClass(text)
          : 'selection-option-button-unanswered'
      }
      onClick={() => handleWouldYouRather(text)}
      loading={!text}
    >
      {text}
    </Button>
  );

  const columns = [
    {
      title: 'Would you rather...',
      dataIndex: 'selection-option',
      render: renderButtonAndText,
      onCell: (_rowIndex, _colIndex) => ({
        colSpan: !isAnswered ? 3 : 1,
      }),
    },
    {
      title: 'Selected by',
      dataIndex: 'selected-count',
      onCell: sharedOnCell,
    },
    {
      title: 'Total employees',
      dataIndex: 'selected-percent',
      onCell: sharedOnCell,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered={false}
      pagination={false}
      loading={data === []}
    />
  );
};

export default QuestionTable;
