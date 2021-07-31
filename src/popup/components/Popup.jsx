import React, { Component } from 'react';

// styles
import '../styles/popup.scss';

export default class Popup extends Component {
  render() {
    return (
      <div className="popup p-2">
        <div className="flex items-center space-x-2">
          <img src="https://via.placeholder.com/120x36?text=Logo" className="rounded" alt="Logo" />
          <h2 className="text-2xl text-blue-500">Drink Water</h2>
        </div>
        <div className="mt-3">
          <blockquote className="relative pt-4 pl-9 text-base italic leading-normal text-gray-600">
            Things may come to those who wait, but only the things left by those who hustle.
            <cite className="inline-block text-xs leading-normal text-gray-400">Abraham Lincoln</cite>
          </blockquote>
        </div>
        <div className="mt-3 bg-yellow-500">
          <span>Settings</span>
        </div>
      </div>
    );
  }
}
