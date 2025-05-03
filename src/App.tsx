import { useState } from 'react';
import Button from './components/Button.tsx';
import Span from './components/Span.tsx';
import Input from './components/Input.tsx';
import MyStorage from './components/Storage.ts';
import './styles/style.css';

const storage = new MyStorage('counter-app');
const defaultCount = storage.getItem<number>('count') ?? 0;
const defaultInncNum = storage.getItem<string>('incNum') ?? '1';

function App() {
  const [count, setCount] = useState(defaultCount);
  const [incNum, setIncNum] = useState(defaultInncNum);

  const parseIncNum =(incNum: string) => {
    const parsedNum = parseInt(incNum, 10);
    return isNaN(parsedNum) ? '1' : String(parsedNum);
  }

  const updateClass = (num: number): string =>{
    if (num < 0) return 'fcred';
    if (num > 10) return 'fcgreen';
    return '';
  }

  const saveData = (dataName: string, dataValue: number | string) => {
    storage.setItem(dataName, dataValue);
    storage.save();
  };

  // const updateCount = (func: (prev: number) => number) => {
  //   setCount(prevState => {
  //     const prevNum = func(prevState);
  //     saveData('count', prevNum);
  //     return prevNum;
  //   });
  // }
  const updateCount = (countNum: number, inputIncNum: string, isPlus: boolean) => {
    const incNum = Number(parseIncNum(inputIncNum));
    const newCountNum = isPlus ? countNum + incNum : countNum - incNum;
    saveData('count', newCountNum);
    return newCountNum;
  }

  const handlePlus = () => {
    // updateCount(prev => prev + Number(parseIncNum(incNum)));
    setCount(prevState => updateCount(prevState, incNum, true));
  };

  const handleMinus = () => {
    // updateCount(prev => prev - Number(parseIncNum(incNum)));
    setCount(prevState => updateCount(prevState, incNum, false));
  }

  const handleReset = () => {
    setCount(0);
    saveData('count', 0);
  }

  const handleIncNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(typeof(e.currentTarget.value));
    setIncNum(e.currentTarget.value);
    saveData('incNum', e.currentTarget.value);
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
          onChange={handleIncNum}
        />
      </div>
    </main>
  )
}

export default App
