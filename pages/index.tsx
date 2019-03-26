import React from 'react';
import Greeting from '../components/greeting';
import { connect } from 'react-redux';

interface IStateProps {
  name: string,
  confirm: boolean
}

interface IDispatchProps {
  onShakeHands: () => void
}

interface IOwnProps {};

interface State {};

type Props = IStateProps;

class Page extends React.Component<Props & IDispatchProps, State> {
  render() {
    const { name, confirm, onShakeHands } = this.props;

    return (
      <div>
        <h2>Next.js Application</h2>
        <Greeting name={name} showMessage={confirm}></Greeting>
        {!confirm && <div><button onClick={onShakeHands}>shake hands</button></div>}
      </div>
    )
  }
}

const mapStateToProps = (state): IStateProps => ({
  name: state.user.name,
  confirm: state.user.confirm
})

const mapDispatchToProps = (dispatch): IDispatchProps => ({
  onShakeHands: () => dispatch({ type: 'user:toggle_shake_hands', payload: true })
})

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(Page);
