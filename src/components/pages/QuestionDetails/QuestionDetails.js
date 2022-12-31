import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuestionTable from '../../features/QuestionTable/QuestionTable';
import { selectQuestions, fetchQuestions, saveAnsweredQuestion } from '../../../redux/questions';
import { selectUser, fetchUsers } from '../../../redux/users';

const UNANSWERED_STYLING = 'unanswered';
const ANSWERED_STYLING = 'answered';

const QuestionDetails = (props) => {
    const questionParams = useParams();

    const dispatch = useDispatch();

    // Selections
    const questions = useSelector(selectQuestions);
    const currentUser = useSelector(selectUser);

    const [question, setQuestion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [styling, setStyling] = useState('UNANSWERED_STYLING');

    useEffect(() => {
        const { question_id: questionId } = questionParams;
        const specifiedQuestion = questions[questionId];
        if (!specifiedQuestion) {
            setErrorMessage(`Invalid question identifier '${questionId}'. Please specify a valid question identifier.`);
        } else {
            setErrorMessage('');
            setQuestion(specifiedQuestion);
        }
        return () => {};
    }, [questions, questionParams]);

    useEffect(() => {
        const { question_id: questionId } = questionParams;
        if (Object.keys(currentUser.answers).includes(questionId)) {
            setStyling(ANSWERED_STYLING);
        } else {
            setStyling(UNANSWERED_STYLING);
        }
        return () => {};
    }, [currentUser,questionParams]);

    const refreshStore = () => {
        dispatch(fetchUsers());
        dispatch(fetchQuestions());
    };

    const submitAnsweredQuestion = ({ authedUser, qid, answer }) => {
        dispatch(saveAnsweredQuestion({ authedUser, qid, answer }));
        refreshStore();
    };

    return (
        <div>
            {!errorMessage ? null : <Typography.Title type='danger'>{errorMessage}</Typography.Title>}
            {!question ? null : <QuestionTable
                setConfirmedAnswer={submitAnsweredQuestion}
                question={question}
                styling={styling}
            />}
        </div>
    );
};

export default QuestionDetails;
