import React from 'react';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-violet-800 text-white shadow-md'>
      <h1 className='font-bold text-2xl'>TODO-LIST</h1>
      <ul className='flex gap-8 text-lg'>
        <li className='hover:text-gray-300 cursor-pointer'>Home</li>
        <li className='hover:text-gray-300 cursor-pointer'>Insert</li>
        <li className='hover:text-gray-300 cursor-pointer'>Blog</li>
      </ul>
    </div>
  );
};

export default Navbar;
