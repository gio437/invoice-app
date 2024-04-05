import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const [contacts, nextContact] = useState([]);

  const getContact = () => {
    // change all of these to ID
    const inputField = document.querySelector('.contactInputField');
    const contactInfo = inputField.value;
    generateContact(contactInfo);
    inputField.value = '';
  }

  let contactCount = 0;
  const generateContact = (contactInfo) => {
    nextContact(prev => prev.concat(contactCount)); // used to match id with array
    const contactParent = document.querySelector('.contactList');
    const newContact = document.createElement('div');
    newContact.textContent = contactInfo;
    newContact.classList.add('contact');
    newContact.id = contactCount;
    contactParent.append(newContact);
    contactCount++;
    generateDeleteBtn(contactParent, contactInfo);
  }

  const generateDeleteBtn = (contactParent, contactInfo) => {
    if (contactInfo !== '') {
      const newBtn = document.createElement('button');
      newBtn.classList.add('contact');
      newBtn.id = contactCount;
      contactParent.append(newBtn);
    }
  }

  const deleteContact = () => {
    const contactList = document.querySelectorAll('.contact');
    for (let i = 0; i < contactList.length; i++) {
      // grab previously used function
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice App</h1>
      </header>
      <div className='input-contacts'>
        <label for='contact-input'>Input Contact</label>
        <input className='contactInputField' type='text' name='contact-input' placeholder='New Contact?'></input>
        <button className='submitContactBtn' onClick={getContact}>Enter</button>
      </div>
      <div className='contactList'></div>
    </div>
  );
}

export default App;
