import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/users';
// import { selectQuestions } from '../../redux/questions';
import Questions from '../../features/Questions/Questions';
import './Leaderboard.css';

const Leaderboard = () => {
  const leaderboard = 'Leaderboard';

  return (
    <div>
      <Questions title={leaderboard} />
    </div>
  );
};

export default Leaderboard;
