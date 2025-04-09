import React from 'react';

const ToggleSwitch = ({ view, setView }) => {
  return (
    <div className="bg-gray-200 p-1 rounded-full flex items-center relative">
      <button
        className={`px-4 py-1 rounded-full z-10 transition ${
          view === 'grid' ? 'text-white' : 'text-gray-500'
        }`}
        onClick={() => setView('grid')}
      >
        Grid
      </button>
      <button
        className={`px-4 py-1 rounded-full z-10 transition ${
          view === 'list' ? 'text-white' : 'text-gray-500'
        }`}
        onClick={() => setView('list')}
      >
        List
      </button>
      <span
        className={`absolute bg-[#363636] rounded-full transition-all duration-300 shadow-md ${
          view === 'grid'
            ? 'left-1 w-[50%]'
            : 'left-[50%] w-[48%]'
        } h-[80%]`}
      />
    </div>
  );
};

export default ToggleSwitch;
