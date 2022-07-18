import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import './App.css';

const socket = io('http://localhost:5000');
const userName = nanoid(10);

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat', { message, userName });
    setMessage('');
  };

  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Chat App</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index} className='msgData'>
              <section>{payload.message}</section>
              <span> id:{payload.userName}</span>
            </p>
          );
        })}
        <form onSubmit={sendMessage}>
          <input
            type='text'
            name='chat'
            placeholder='send text'
            value={message}
            onChange={(evt) => {
              setMessage(evt.target.value);
            }}
          />
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
