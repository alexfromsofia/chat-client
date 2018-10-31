import React from 'react';

export default class Submit extends React.PureComponent {
  render() {
    const { onClick, onKeyUp, refNode, placeholder } = this.props;

    return (
      <section className="chat-submit-wrapper">
        <input
          className="chat-input"
          ref={ refNode } type="text"
          placeholder={ placeholder }
          onKeyUp={onKeyUp}
        />
        <button
          className="chat-submit-button"
          onClick={ onClick }>
          Send
        </button>
      </section>
    )
  }
}
