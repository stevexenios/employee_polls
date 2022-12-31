import { Button, Divider, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionTable from '../QuestionTable/QuestionTable';

const QuestionSummary = ({ restore, question, styling }) => {
  const navigate = useNavigate();

  const [displayModal, setDisplayModal] = useState(false);
  const [confirmedAnswer, setConfirmedAnswer] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    if (confirmedAnswer !== {}) {
      setConfirmLoading(true);
      restore(confirmedAnswer);
      setTimeout(() => {
        setDisplayModal(false);
        setConfirmLoading(false);
      }, 500);
    } else
      console.log(
        'ConfirmedAnswer is still an empty object. Nothing to submit!'
      );
  };

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const getTimeElement = (timestamp) => {
    const dateObject = new Date(timestamp);
    const dateString = dateObject.toLocaleDateString('en-US');
    const timeString = dateObject.toLocaleTimeString('en-US');

    return (
      <span className="date-display">
        <i>{timeString}</i> | <b>{dateString}</b>
      </span>
    );
  };

  const goToQuestion = () => {
    navigate(`/questions/${question?.id}`);
  };

  return (
    <div className={'question-container-' + styling}>
      <Divider>
        <h4>{question?.author}</h4>
      </Divider>
      {getTimeElement(question?.timestamp)}
      <Button
        type="primary"
        size="small"
        className="button-display"
        onClick={() => setDisplayModal(true)}
      >
        Display summary
      </Button>

      <Button
        type="primary"
        size="small"
        className="button-display"
        onClick={() => goToQuestion()}
      >
        Go to question
      </Button>

      <Modal
        title="Would You Rather...?"
        open={displayModal}
        okText="Confirm"
        cancelText="Close"
        width="auto"
        onCancel={handleCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <QuestionTable
          setConfirmedAnswer={setConfirmedAnswer}
          question={question}
          styling={styling}
        />
      </Modal>
    </div>
  );
};

export default QuestionSummary;
