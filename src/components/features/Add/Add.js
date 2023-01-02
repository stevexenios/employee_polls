import { useEffect, useState, useRef } from 'react';
import { fetchUsers, selectUser } from '../../../redux/users';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions, saveNewQuestion } from '../../../redux/questions';

import './Add.css';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const setOptionsRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentUser = useSelector(selectUser);
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');

  useEffect(() => {
    setOptionsRef.current.focus();
  }, []);

  const handleOptionOneChange = (e) => {
    const text = e.target.value;
    setOptionOneText(text);
  };

  const handleOptionTwoChange = (e) => {
    const text = e.target.value;
    setOptionTwoText(text);
  };

  const reStore = () => {
    console.log(' Add - currentUser.: ', currentUser);
    dispatch(saveNewQuestion({ optionOneText, optionTwoText, author: currentUser.id }));
    dispatch(fetchQuestions());
    dispatch(fetchUsers());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reStore();
    navigate('/home', { replace: true });
  };

  const optionOneTextLeft = 200 - optionOneText.length;
  const optionTwoTextLeft = 200 - optionTwoText.length;

  return (
    <div>
      <div className="h3_center">
        <h3>Would You Rather...?</h3>
        <form className="new_question_form" onSubmit={handleSubmit}>
          <div className="new_question_form_inner">
            <div className="new_question_form_sub">
              <textarea
                placeholder="Option One"
                value={optionOneText}
                onChange={handleOptionOneChange}
                className="new_question_text_area"
                maxLength={200}
                ref={setOptionsRef}
              />
              {optionOneTextLeft <= 200 && (
                <div className="new_question_length">{optionOneTextLeft}</div>
              )}
            </div>

            <div className="new_question_form_sub">
              <textarea
                placeholder="Option Two"
                value={optionTwoText}
                onChange={handleOptionTwoChange}
                className="new_question_text_area"
                maxLength={200}
                ref={setOptionsRef}
              />
              {optionTwoTextLeft <= 200 && (
                <div className="new_question_length">{optionTwoTextLeft}</div>
              )}
            </div>
          </div>

          <button
            className="new_question_button_sub"
            type="submit"
            disabled={!(optionOneText && optionTwoText)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
