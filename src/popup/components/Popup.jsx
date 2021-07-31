import React, { Component } from 'react';

export default class Popup extends Component {
  render() {
    return (
      <div className="m-1">
        <div className="flex items-center space-x-1">
          <img src="https://via.placeholder.com/120x32?text=Logo" width="80" height="32" alt="Logo" />
          <h2>Drink Water</h2>
        </div>
      </div>
    );
  }
}
