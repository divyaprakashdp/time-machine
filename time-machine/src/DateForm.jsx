import { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import OptionsPage from './OptionsPage';

function DateForm({ onSelectDate }) {
  const [date, setDate] = useState(new Date);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const date = formData.get("date");
    onSelectDate(date);
    history.push(`/options/${date}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter a date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <button type="submit">Go</button>
    </form>
  );
}

export default DateForm;
