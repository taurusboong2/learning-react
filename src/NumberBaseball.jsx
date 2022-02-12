import React, { useState } from 'react';
import Try from './Try';

const getNumbers = () => {
  const cadidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = cadidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    arr.push(chosen);
  }
  return arr;
};

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitForm = e => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런!');
      setTries(prevTries => {
        return [...prevTries, { try: value, result: '홈런!' }];
      });
      alert('홈런! 게임을 다시 시작합니다.');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArr = value.split('').map(e => parseInt(e));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번의 기회 실패! 답은 ${answer.join(',')}였습니다! `);
        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArr[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArr[i])) {
            ball += 1;
          }
        }
        setTries(prevTries => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다. ` }];
        });
        setValue('');
      }
    }
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <div id="NumberBaseball">
      <h1>숫자 야구</h1>
      <h3>{result}</h3>
      <form onSubmit={onSubmitForm}>
        <input type="text" maxLength={4} value={value} onChange={onChange} />
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((e, i) => {
          return <Try key={`${i + 1}차 시도 :`} tryInfo={e} />;
        })}
      </ul>
    </div>
  );
};

export default NumberBaseball;
