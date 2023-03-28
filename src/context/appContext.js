import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import { START_GAME, END_GAME, INCREMENT, RETRY_GAME } from './action';
import reducer from './reducer';
import { shuffle } from 'lodash';
const AppContext = React.createContext();

const initialState = {
  hasStarted: false,
  hasEnded: false,
  difficulty: 'easy',
  typeOfQuestion: 'multiple',
  category: '',
  amount: 5,
  answers: [],
  score: 0,
  questions: [],
  selectedAnswers: [],
  showAnswers: false,
  retry: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function startQuizz({ difficulty, typeOfQuestion, category, amount }) {
    const data = await axios(
      `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${typeOfQuestion}&category=${category}`
    );
    const questions = data.data.results.map((ele) => {
      return {
        question: ele.question,
        answers: shuffle([ele.correct_answer, ...ele.incorrect_answers]),
        coAnswer: ele.correct_answer,
      };
    });
    dispatch({
      type: START_GAME,
      payload: { difficulty, typeOfQuestion, category, questions, amount },
    });
  }
  function endQuizz(selectedAns) {
    const { retry } = state;
    if (retry === 0) {
      const { questions } = state;
      questions.forEach((ele, index) => {
        ele.coAnswer === selectedAns[index]
          ? dispatch({ type: INCREMENT })
          : console.log('processed');
      });
    }

    if (retry !== 1) {
      dispatch({ type: END_GAME });
    }
    if (retry === 1) {
      dispatch({ type: RETRY_GAME });
    }
  }
  return (
    <AppContext.Provider value={{ ...state, startQuizz, endQuizz }}>
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
