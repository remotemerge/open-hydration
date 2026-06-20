import * as React from 'react';

// styles
import '../styles/popup.scss';

export default function Popup() {
  return (
    <div className="popup text-base">
      <div className="flex items-center p-2 space-x-1 bg-gray-100 border-b border-gray-300">
        <img src="/icons/logo.svg" role="img" width="32" alt="Logo" />
        <p className="text-3xl text-blue-500">Drink Water</p>
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
          className="flex-1 p-2 cursor-pointer bg-gray-300 text-gray-600 hover:bg-gray-400 transition duration-200"
        >
          Close
        </div>
        <div
          onClick={() => chrome.runtime.openOptionsPage()}
          className="flex-1 p-2 cursor-pointer bg-blue-500 text-gray-100 hover:bg-blue-600 transition duration-200"
        >
          Settings
        </div>
      </div>
    </div>
  );
}
