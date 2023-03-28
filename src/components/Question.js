import React from 'react';
import { useAppContext } from '../context/appContext';
import parse from 'html-react-parser';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import Confetti from 'react-confetti';
function Question() {
  const { questions, showAnswers, endQuizz, amount, score, typeOfQuestion } =
    useAppContext();
  const [selectedAns, setSelectedAns] = useState(
    Array.from({ length: amount }, () => Math.random().toFixed(16))
  );
  const data = questions.map((el, index) => {
    const ans = el.answers.map((ele) => {
      const disabled = { pointerEvents: 'none' };
      const alt = {
        backgroundColor: '#7209b7',
        opacity: 0.3,
        border: 0,
        cursor: 'pointer',
        pointerEvents: 'none',
      };
      const correct = {
        backgroundColor: '#94D7A2',
        border: 0,
        pointerEvents: 'none',
      };
      const incorrect = {
        backgroundColor: '#d62828',
        border: 0,
        pointerEvents: 'none',
      };
      return (
        <li
          key={nanoid()}
          className='alt'
          onClick={() => {
            if (typeOfQuestion === 'multiple') {
              setSelectedAns((prev) =>
                prev.map((a) => (prev.indexOf(a) === index ? parse(ele) : a))
              );
            } else {
              setSelectedAns((prev) =>
                prev.map((a) =>
                  prev.indexOf(a) === index ? ele + a.slice(-18) : a
                )
              );
            }
          }}
          style={
            typeOfQuestion === 'multiple'
              ? showAnswers
                ? parse(ele) === parse(el.coAnswer)
                  ? correct
                  : selectedAns[index] === parse(ele)
                  ? incorrect
                  : disabled
                : selectedAns[index] === parse(ele)
                ? alt
                : {}
              : showAnswers
              ? parse(ele) === parse(el.coAnswer)
                ? correct
                : selectedAns[index].replace(
                    selectedAns[index].slice(-18),
                    ''
                  ) === parse(ele)
                ? incorrect
                : disabled
              : selectedAns[index].replace(
                  selectedAns[index].slice(-18),
                  ''
                ) === parse(ele)
              ? alt
              : {}
          }
        >
          {parse(ele)}
        </li>
      );
    });
    return (
      <div key={nanoid()} className='question-box'>
        <h2 className='questions'>{parse(el.question)}</h2>
        <div className='answers'>{ans}</div>
      </div>
    );
  });

  return (
    <div className='game-box'>
      {data}
      {showAnswers ? (
        <p className='results'>
          You scored {score}/{amount} correct answers{' '}
          {score < amount ? '☹' : '🥳'}
        </p>
      ) : (
        ''
      )}
      <button
        className='check-btn'
        onClick={() => {
          if (typeOfQuestion === 'multiple') {
            endQuizz(selectedAns);
          } else {
            const sel = selectedAns.map((ele) =>
              ele.replace(ele.slice(-18), '')
            );
            endQuizz(sel);
          }
        }}
      >
        {showAnswers ? 'Play again' : 'Check answers'}
      </button>
      {score === amount ? <Confetti /> : ''}
    </div>
  );
}

export default Question;
