import { useCallback, useState } from 'react';
import './App.css';

import MemoContainer from './components/MemoContainer';
import SideBar from './components/SideBar';
import { getItem, setItem } from './lib/storage';
import debounce from 'lodash.debounce';

const debounceSetItem = debounce(setItem, 5000);

function App() {
  console.log('test');

  const [memos, setMemos] = useState(getItem('memo') || []);

  const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

  const setMemo = useCallback(
    (newMemo) => {
      //setMemos(newMemos);
      setMemos((memos) => {
        const newMemos = [...memos];
        newMemos[selectedMemoIndex] = newMemo;

        debounceSetItem('memo', newMemos);

        return newMemos;
      });
    },
    [selectedMemoIndex],
  );

  const addMemo = useCallback(() => {
    //setMemos(newMemos);
    setMemos((memos) => {
      const nowDate = new Date().getTime();
      const newMemos = [
        ...memos,
        {
          title: 'Untitled',
          content: '',
          createdAt: nowDate,
          updatedAt: nowDate,
        },
      ];

      debounceSetItem('memo', newMemos);

      return newMemos;
    });
    setSelectedMemoIndex(memos.length);
  }, [memos]);

  const deleteMemo = useCallback(
    (index) => {
      //setMemos(newMemos);
      setMemos((memos) => {
        const newMemos = [...memos];

        newMemos.splice(index, 1);
        debounceSetItem('memo', newMemos);

        return newMemos;
      });
      //setSelectedMemoIndex(index - 1);
      if (index === selectedMemoIndex) {
        setSelectedMemoIndex(0);
      }
    },
    [selectedMemoIndex],
  );

  // const setSelectedMemoIndex = (newSelectedMemoIndex) => {
  //   //newSelectedMemoIndex = newSelectedMemoIndex;
  //   console.log('newSelectedMemoIndex', newSelectedMemoIndex);
  //   setSelectMemoIndex(newSelectedMemoIndex);
  // };

  return (
    <div className="App">
      <SideBar
        memos={memos}
        setSelectedMemoIndex={setSelectedMemoIndex}
        selectedMemoIndex={selectedMemoIndex}
        addMemo={addMemo}
        deleteMemo={deleteMemo}
      />
      <MemoContainer memos={memos[selectedMemoIndex]} setMemo={setMemo} />
    </div>
  );
}

export default App;
