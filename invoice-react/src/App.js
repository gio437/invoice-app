import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const [contacts, newContact] = useState([]);

  const getContact = () => {
    const inputField = document.querySelector('.contactInputField');
    const contactInfo = inputField.value;
    generateContact(contactInfo);
  }

  const generateContact = (contact) => {
    const contactParent = document.querySelector('.contactList');
    const newContact = document.createElement('div');
    newContact.textContent = contact;
    contactParent.append(newContact);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice App</h1>
      </header>
      <div className='input-contacts'>
        <label for='contact-input'>Input Contact </label>
        <input className='contactInputField' type='text' name='contact-input' placeholder='New Contact?'></input>
        <button className='submitContactBtn' onClick={getContact}>Enter</button>
      </div>
      <div className='contactList'></div>
    </div>
  );
}

export default App;
