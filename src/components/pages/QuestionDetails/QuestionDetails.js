import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuestionTable from '../../features/QuestionTable/QuestionTable';
import { selectQuestions } from '../../../redux/questions';
import { selectUser } from '../../../redux/users';

const UNANSWERED_STYLING = 'unanswered';
const ANSWERED_STYLING = 'answered';

const QuestionDetails = (props) => {
    const questionParams = useParams();

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

    return (
        <div>
            {!errorMessage ? null : 
                <section style={{ textAlign: 'center' }}>
                    <Typography.Title type='danger'>{404}</Typography.Title>
                    <Typography.Text type='warning' strong={true} >{errorMessage}</Typography.Text>
                </section>}
            {!question ? null :
            <QuestionTable
                question={question}
                styling={styling}
            />}
        </div>
    );
};

export default QuestionDetails;
