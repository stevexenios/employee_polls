import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { selectUser, selectTotalUsers } from '../../../redux/users';
import { useSelector } from 'react-redux';
import errorHandler from '../../../utils/errorHandler';

const QuestionTable = ({ setConfirmedAnswer, question, styling }) => {
  const currentUser = useSelector(selectUser);
  const totalEmployees = useSelector(selectTotalUsers);
  const [isAnswered, setIsAnswered] = useState(false);
  const [data, setData] = useState([]);
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionSelected, setOptionSelected] = useState('');
  const [confirmedText, setConfirmedText] = useState('');

  useEffect(() => {
    console.log('QuestionTable - question: ', question);
    console.log('QuestionTable - currentUser: ', currentUser);
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

  useEffect(() => {
    let answer = '';
    if (confirmedText === optionOne) {
      answer = 'optionOne';
    } else if (confirmedText === optionTwo) {
      answer = 'optionTwo';
    }

    if (answer) {
      const authedUser = currentUser?.id;
      const qid = question?.id;
      setConfirmedAnswer({ authedUser, qid, answer });
    }
  }, [confirmedText]);

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
    setConfirmedText(text);
    if (text && (optionOne || optionTwo)) {
      if (text === optionOne) {
        setOptionSelected('optionOne');
      } else if (text === optionTwo) {
        setOptionSelected('optionOne');
      } else {
        errorHandler(
          `Text mismatch with options: text='${text}', optionOne='${optionOne}' or optionTwo='${optionTwo}'.`
        );
      }
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
      disabled={isAnswered}
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
