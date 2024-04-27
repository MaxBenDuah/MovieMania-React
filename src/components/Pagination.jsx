function Pagination({ setPageNum }) {
  return (
    <div>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <button onClick={() => setPageNum(num)} key={num}>
          {num}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
