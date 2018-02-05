import React, { Component } from 'react';
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

class HomeView extends Component {
  componentWillMount() {
     window.location = 'https://terrapinticketing.com';
  }

  render() {
    return (
      <div>
        <h2>Some Rise, Some Fall, Some Climb...to get to Terrapin</h2>
      </div>
    );
  }
}

export default HomeView;
