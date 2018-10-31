import React from 'react';
import io from "socket.io-client";

import Header from './components/HeaderComponent';
import Submit from './components/SubmitComponent';

import './App.css';

import constants from './constants';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.chatMessageInputRef = React.createRef();
    this.usernameInputRef = React.createRef();
    this.state = {
      username: '',
      message: '',
      messages: []
    };

    this.socket = io(constants.DEFAULT_SOCKET_URL);
    this.socket.on(constants.RECEIVE_MESSAGE, (data) => {
      this.handleAddMessage(data);
    });

    this.handleAddMessage = this.handleAddMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddMessage(message) {
    this.setState({ messages: [...this.state.messages, message] });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username } = this.state;


    if (!username) {
      return this.setState({ username: this.usernameInputRef.current.value })
    }

    this.socket.emit(constants.SEND_MESSAGE, {
      author: this.state.username,
      message: this.chatMessageInputRef.current.value,
    });

    this.clearInput();
  }

  clearInput() {
    this.chatMessageInputRef.current.value = '';
  }

  handleSubmitKeyUp(e) {
    e.preventDefault();
    e.stopPropagation();
    // Enter Key
    if (e.keyCode === 13) {
      this.handleSubmit(e)
    }
  }

  renderMessages() {
    const { messages } = this.state;

    if (!messages.length) return null;

    return messages.map((item, i) => {
      const { author, message } = item;

      return (
        <div key={ `chat-message-${i}` } className="message-container">
          <div className="message-author">Author: { author }</div>
          <div className="message-item">Message: { message }</div>
        </div>
      );
    })
  }

  renderChatWindow() {
    return (
      <div>
        { this.renderMessages() }
        <Submit
          onClick={ this.handleSubmit }
          refNode={ this.chatMessageInputRef }
          placeholder="Type your message here..."
          onKeyUp={ this.handleSubmitKeyUp }
        />
      </div>
    )
  }

  render() {
    const { username } = this.state;

    return (
      <div className="App">
        <Header/>
        <div className="chat-wrapper">
          { username ?
            this.renderChatWindow()
            : <Submit
              onClick={ this.handleSubmit }
              refNode={ this.usernameInputRef }
              placeholder="Type your username here..."
              onKeyUp={ this.handleSubmitKeyUp }
            />
          }
        </div>
      </div>
    );
  }
}
