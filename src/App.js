
import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js'
import instance from './axios';

///Install pusher-js for frontend

function App() {
  const [messages,setMessages] = useState([]);
  useEffect(()=>{
    instance.get('/messages/sync')
    .then(response => {
      setMessages(response.data)
    })
  },[])


  useEffect(()=>{
    
    const pusher = new Pusher('09e09410f3700ab0ae7a', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      setMessages([...messages,data]);
      
    });
    return ()=>{
      channel.unbind_all()
      channel.unsubscribe();
    }
  },[messages])
  console.log(messages);
  return (
    <div className="app">
    <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
    </div>
    </div>
  );
}

export default App;
