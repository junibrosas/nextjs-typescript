import React from 'react';

interface IProps {
  name: string;
}

export default class extends React.Component<IProps, {}> {
  render() {
    const { name } = this.props;

    return <div>Hello, {name}</div>
  }
}
