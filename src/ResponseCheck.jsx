import React, { Component } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    msg: '클릭해서 시작하세요.',
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, msg, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        msg: '초록색이 되면 클릭하세요.',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          msg: '지금 클릭!',
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        msg: '너무 성급했어요. 초록색이 된 후에 클릭하세요!',
      });
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState(prevState => {
        return {
          state: 'waiting',
          msg: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>평균 시간 : {result.reduce((a, c) => a + c / result.length)}ms</div>
        <button onClick={this.onReset}>리셋하기</button>
      </>
    );
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  render() {
    const { state, msg } = this.state;
    return (
      <div id="screen_wrap">
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {msg}
        </div>
        {this.renderAverage()}
      </div>
    );
  }
}

export default ResponseCheck;
