import { useState } from 'react';
import Button from './components/Button.tsx';
import Span from './components/Span.tsx';
import Input from './components/Input.tsx';
import './styles/style.css'

function App() {
  const [count, setCount] = useState(0);
  const [incNum, setIncNum] = useState('1');

  function parseIncNum(incNum: string) {
    const parsedNum = parseInt(incNum, 10);
    return isNaN(parsedNum) ? '1' : String(parsedNum);
  }

  function updateClass(num: number): string {
    if (num < 0) return 'fcred';
    if (num > 10) return 'fcgreen';
    return '';
  }

  const handlePlus = () => {
    // console.log('incNum', Number(parseIncNum(incNum)));
    setCount(prevState => prevState + Number(parseIncNum(incNum)));
    // setIncNum(prevState => {
    //   console.log('prevIncNum', prevState);
    // })
  };

  const handleMinus = () => {
    setCount(prevState => prevState - Number(parseIncNum(incNum)));
  }

  const handleReset = () => {
    setCount(0);
  }

  return (
    <main role="main">
      <h1 className="pageTitle">Javascript演習<span>カウンター制御</span></h1>
      <div className="counterWrap">
        <Span
          id='countertxt'
          count={count}
          className={updateClass(count)}
        />
        <Button onClick={handlePlus} id='plus' label='+' />
        <Button onClick={handleMinus} id='minus' label='-' /><Button id='reset' label='リセット' onClick={handleReset} />
      </div>
      <div className="userInputbox">増減値（初期値：1）
        <Input
          type='number'
          id='includenum'
          name='includenum'
          value={parseIncNum(incNum)}
          onChange={(e) => setIncNum(e.currentTarget.value)}
        />
      </div>
    </main>
  )
}

export default App
