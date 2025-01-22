import './index.css';

function MemoContainer({ memos, setMemo }) {
  if (memos === undefined) {
    return (
      <dev>
        <h1>메모가 없습니다.</h1>
        <h2>새로운 메모를 생성해주세요.</h2>
      </dev>
    );
  }

  return (
    <div className="MemoContainer">
      <div>
        <input
          type="text"
          className="MemoContainer__title"
          value={memos.title}
          onChange={(e) => {
            setMemo({
              ...memos,
              title: e.target.value,
              updatedAt: new Date().getTime(),
              isSelected: true,
            });
          }}
        />
      </div>
      <div>
        <textarea
          className="MemoContainer__content"
          value={memos.content}
          onChange={(e) => {
            setMemo({
              ...memos,
              content: e.target.value,
              updatedAt: new Date().getTime(),
            });
          }}
        />
      </div>
    </div>
  );
}

export default MemoContainer;
