import { useState } from 'react';
import Button from './components/Button.tsx';
import Span from './components/Span.tsx';
import Input from './components/Input.tsx';
import MyStorage from './components/Storage.ts';
import './styles/style.css';

const storage = new MyStorage('counter-app');
const defaultCount = storage.getItem('count') ? storage.getItem('count') as number : 0;
const defaultInncNum = storage.getItem('incNum') ? storage.getItem('incNum') as string: '1';

function App() {
  const [count, setCount] = useState(defaultCount);
  const [incNum, setIncNum] = useState(defaultInncNum);

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
    setCount(
      prevState => {
        const updateCount = prevState + Number(parseIncNum(incNum));
        storage.setItem('count', updateCount);
        storage.save();
        return updateCount;
      }
    );
  };

  const handleMinus = () => {
    setCount(
      prevState => {
        const updateCount = prevState - Number(parseIncNum(incNum));
        storage.setItem('count', updateCount);
        storage.save();
        return updateCount;
      }
    );
  }

  const handleReset = () => {
    setCount(0);
    storage.setItem('count', 0);
    storage.save();
  }

  const handleIncNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(typeof(e.currentTarget.value));
    setIncNum(e.currentTarget.value);
    storage.setItem('incNum', e.currentTarget.value);
    storage.save();
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
