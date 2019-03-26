import React from 'react';

interface IProps {
  name: string;
  showMessage: boolean;
}

export default class extends React.Component<IProps, {}> {
  render() {
    const { name, showMessage } = this.props;

    return <span>
      <span>Hello, {name}.</span> 
      {showMessage && <span> Welcome to the team!</span>}
    </span>
  }
}
