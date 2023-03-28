import { START_GAME, END_GAME, INCREMENT, RETRY_GAME } from './action';
import { initialState } from './appContext';
const reducer = (state, action) => {
  if (action.type === START_GAME) {
    return {
      ...state,
      difficulty: action.payload.difficulty,
      typeOfQuestion: action.payload.typeOfQuestion,
      category: action.payload.category,
      hasStarted: true,
      questions: action.payload.questions,
      amount: action.payload.amount,
    };
  }
  if (action.type === END_GAME) {
    return {
      ...state,
      hasEnded: true,
      showAnswers: true,
      retry: state.retry + 1,
    };
  }
  if (action.type === INCREMENT) {
    return {
      ...state,
      score: state.score + 1,
    };
  }
  if (action.type === RETRY_GAME) {
    return {
      ...initialState,
    };
  }
  throw new Error(`no such action : ${action.type}`);
};
export default reducer;
