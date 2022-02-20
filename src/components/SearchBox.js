import { useState } from "react";

const SearchBox = ({ searchTerm, setOffset, offset, limit, totalImages }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    searchTerm(text);
    setOffset(0);
  };

  return (
    <div className='background-primary w100 fixed flex gap-4 flex-column px-2 py-4 z-index-1 box-shadow-1'>
      <form onSubmit={onSubmit}>
        <div className='mx-auto mw-500 flex space-between mx-4 gap-4'>
          <input
            className='w100 background-primary border-black border-solid border-1 px-4 py-2'
            onChange={(e) => setText(e.target.value)}
            type='text'
            placeholder='Search for...'
          />
          <button
            className='background-accent border-black border-solid border-1 px-4 py-2'
            type='submit'>
            Search
          </button>
        </div>
      </form>
      <div className='mx-auto w100 mw-500 background-accent py-2 px-4'>
        Limit: {limit}, Images: {offset + limit}/{totalImages}, Wasted:{" "}
        <span id='timer'></span> seconds
      </div>
    </div>
  );
};

export default SearchBox;
