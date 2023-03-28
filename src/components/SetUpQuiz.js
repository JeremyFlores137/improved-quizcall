import { useState } from 'react';
import { useAppContext } from '../context/appContext';

export default function SetUpQuiz() {
  const { startQuizz } = useAppContext();
  const [formData, setFormData] = useState({
    difficulty: 'easy',
    typeOfQuestion: 'multiple',
    category: '',
    amount: 5,
  });
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }
  return (
    <form
      className='set-up'
      onSubmit={(e) => {
        e.preventDefault();
        startQuizz(formData);
      }}
    >
      <label htmlFor='difficulty'>Select difficulty:</label>
      <select
        className='select'
        name='difficulty'
        id='difficulty'
        value={formData.difficulty}
        onChange={handleChange}
      >
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </select>
      <label htmlFor='typeOfQuestion'>Select type of questions:</label>
      <select
        className='select'
        name='typeOfQuestion'
        id='typeOfQuestion'
        value={formData.typeOfQuestion}
        onChange={handleChange}
      >
        <option value='multiple'>Multiple choice</option>
        <option value='boolean'>True and False</option>
      </select>
      <label htmlFor='category'>Select category:</label>
      <select
        className='select'
        name='category'
        id='category'
        value={formData.category}
        onChange={handleChange}
      >
        <option value=''>Any category</option>
        <option value='9'>General Knowledge</option>
        <option value='10'>Entertainment: Books</option>
        <option value='11'>Entertainment: Film</option>
        <option value='12'>Entertainment: Music</option>
        <option value='13'>Entertainment: Musicals & Theatres</option>
        <option value='14'>Entertainment: Television</option>
        <option value='15'>Entertainment: Video Games</option>
        <option value='16'>Entertainment: Board Games</option>
        <option value='17'>Science & Nature</option>
        <option value='18'>Science: Computers</option>
        <option value='19'>Science: Mathematics</option>
        <option value='20'>Mythology</option>
        <option value='21'>Sports</option>
        <option value='22'>Geography</option>
        <option value='23'>History</option>
        <option value='24'>Politics</option>
        <option value='25'>Art</option>
        <option value='26'>Celebrities</option>
        <option value='27'>Animals</option>
        <option value='28'>Vehicles</option>
        <option value='29'>Entertainment: Comics</option>
        <option value='30'>Science: Gadgets</option>
        <option value='31'>Entertainment: Japanese Anime & Manga</option>
        <option value='32'>Entertainment: Cartoon & Animations</option>
      </select>
      <label htmlFor='amount'>Select amount of questions:</label>
      <input
        type='number'
        className='select'
        name='amount'
        id='amount'
        value={formData.amount}
        onChange={handleChange}
        min='1'
        max='50'
      ></input>
      <button className='start-btn'>Start Quizz</button>
    </form>
  );
}
