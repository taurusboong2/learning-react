import React, { useRef, useState } from 'react';

const WordRelay = () => {
  const [word, setWord] = useState('리액트');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕! 정답입니다!');
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡! 틀렸습니다.');
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input type="text" ref={inputRef} value={value} onChange={onChange} />
        <button>입력</button>
        <p>{result}</p>
      </form>
    </>
  );
};

export default WordRelay;
