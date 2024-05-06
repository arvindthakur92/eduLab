import { useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);

  const generateStudentId = () => {
    setLoading(true);
    fetch('http://localhost:5000/students/generateIdCard').then(response => response.json()).then((response) => {
      console.log('response :>> ', response);
      // const { path } = response
      const path = 'http://localhost:5000/generated-pdf/student-id.pdf'
      setLoading(false);
      window.open(path, '_blank')
    })
    .catch((err) => {
      setLoading(false);
      alert('Failed')
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <button 
          className='generate-button'
          disabled={loading}
          onClick={generateStudentId}>Generate</button>

        {loading && <div>Loading...</div>}
      </header>
    </div>
  );
}

export default App;
