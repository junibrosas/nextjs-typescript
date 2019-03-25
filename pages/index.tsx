import React from 'react';
import Greeting from '../components/greeting';

export default class extends React.Component {
  render() {    
    return <div>
      <h2>Next.js Application</h2>
      <Greeting name="John Doe"></Greeting>
    </div>
  }
}