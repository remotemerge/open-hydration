import React from 'react';

// styles
import '../styles/popup.scss';
// images
import logoImg from '@/public/icons/48.png';

export default function Popup() {
  return (
    <div className="popup text-base">
      <div className="flex items-center px-2">
        <img src={logoImg} width="48" alt="Logo" />
        <h2 className="pt-5 text-2xl text-blue-500">Drink Water</h2>
      </div>
      <div className="my-2 px-2">
        <blockquote className="relative pt-4 pl-9 italic leading-normal text-gray-600">
          Things may come to those who wait, but only the things left by those who hustle.
          <cite className="inline-block text-xs leading-normal text-gray-400">Abraham Lincoln</cite>
        </blockquote>
      </div>
      <div className="flex mt-3 text-center">
        <div
          onClick={() => window.close()}
          className="flex-1 p-2 cursor-pointer bg-gray-300 text-gray-600 hover:bg-gray-400 transition duration-200">
          Close
        </div>
        <div
          onClick={() => chrome.runtime.openOptionsPage()}
          className="flex-1 p-2 cursor-pointer bg-blue-500 text-gray-100 hover:bg-blue-600 transition duration-200">
          Settings
        </div>
      </div>
    </div>
  );
}
