import * as React from 'react';

interface IProps {
  name: string;
  showMessage: boolean;
}

interface IState {}

export default class extends React.Component<IProps, IState> {
  render() {
    const { name, showMessage } = this.props;

    return (
      <div>
        <span className="greeting">Hello, {name}. {showMessage && <span>Welcome to the team!</span>}</span>
      </div>
    )
  }
}
