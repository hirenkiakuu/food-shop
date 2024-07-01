import Button from './components/Button/Button'
import { useState } from 'react';
import { MouseEvent } from 'react';

function App() {
  const [counter, setCounter] = useState<number>(0);
  
  const addCounter = (e: MouseEvent) => {
    console.log(e);
    
  };

  return (
    <>
      <Button onClick={addCounter}>Кнопка</Button>
    </>
  )
}

export default App
