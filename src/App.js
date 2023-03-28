import React from 'react';
import { Intro, Question } from './components';
import { useAppContext } from './context/appContext';
function App() {
  const { hasStarted } = useAppContext();
  return (
    <main className='main'>
      <img
        src='https://media.giphy.com/media/26BRyql7J3iOx875u/giphy.gif'
        className='stars-gif'
        alt='stars falling'
      />
      {hasStarted ? <Question /> : <Intro />}
      <img
        src='https://media.giphy.com/media/26BRyql7J3iOx875u/giphy.gif'
        className='stars-gif'
        alt='stars falling'
      />
    </main>
  );
}

export default App;
