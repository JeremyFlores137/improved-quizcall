import img from '../assets/images/quizz.png';
import audio from '../assets/cut-audio.mp3';
import SetUpQuiz from './SetUpQuiz';
function Intro() {
  const aud = new Audio(audio);
  const togglePlay = () => {
    aud.play();
  };
  return (
      <div className="intro-box">
        <h1 className='title'>
          Welcome to{' '}
          <span className='underline'>
            <span className='first-word'>Qui</span>
            <span className='second-word'>zzi</span>
            <span className='third-word'>cal!</span>
          </span>{' '}
          <span className="check">✓</span>
        </h1>
        <div className='body-img'>
          <img
            src={img}
            className='quizzical-logo'
            alt='img1'
            onClick={togglePlay}
          />
          <p className='paragraph'>
            <span className='pink'>Do you have </span>
            <span className='blue'>sufficient knowledge about</span>
            <span className='pink'> general topics?</span>
            <span className='blue'> Now is the time to prove yourself</span>
          </p>
        </div>
        <SetUpQuiz/>
      </div>
  );
}

export default Intro;
