import './App.css';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [contacts, nextContact] = useState([]);
  const [contactCount, nextContactCount] = useState(0);

  const getContact = () => {
    // change all of these to ID
    const inputField = document.querySelector('.contactInputField');
    const numberField = document.querySelector('.numberInputField');
    const contactInfo = inputField.value;
    const numberInfo = numberField.value;
    generateContact(contactInfo, numberInfo);
    inputField.value = '';
    console.log(numberField.value);
    numberField.value = '';
  }

  const generateContact = (contactInfo, numberInfo) => {
    // const numberRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    if (contactInfo !== '' && numberInfo !== '') {
      nextContact(prev => prev.concat(contactCount)); // used to match id with array
      const contactParent = document.querySelector('.contactList');
      const newContact = document.createElement('div');
      newContact.textContent = contactInfo;
      newContact.classList.add('contact');
      newContact.id = contactCount;
      contactParent.append(newContact);
      nextContactCount(prev => prev + 1); // increment ID for each contact
      generateNumber(numberInfo, contactParent);
      generateDeleteBtn(contactParent, contactInfo);
    }
  }

  const generateNumber = (numberInfo, contactParent) => {
    const newNum = document.createElement('div');
    newNum.textContent = numberInfo;
    newNum.classList.add('contact');
    newNum.id = contactCount;
    contactParent.append(newNum);
  }

  const generateDeleteBtn = (contactParent, contactInfo) => {
    if (contactInfo !== '') {
      const newBtn = document.createElement('button');
      newBtn.classList.add('contactDeleteBtn');
      newBtn.textContent = 'X';
      newBtn.id = contactCount;
      contactParent.append(newBtn);
      newBtn.addEventListener('click', (idNum) => {
        deleteContact(idNum);
      });
    }
  }

  const deleteContact = (idNum) => {
    const contactList = document.querySelectorAll('.contact');
    for (let i = 0; i < contactList.length; i++) {
      if (contactList.id == idNum.id) {
        contactList[i].remove();
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice App</h1>
      </header>
      <div className='main'>
        <div className='input-contacts'>
          <label for='contact-input'>Input Contact</label>
          <input className='contactInputField' type='text' name='contact-input' placeholder='New Contact?'></input>
          <label for='number-input'>Input Phone Number</label>
          <input className='numberInputField' name='number-input' placeholder='Number?' type="text"></input> 
          <button className='submitContactBtn' onClick={getContact}>Enter</button>
        </div>
        <div className='contactList'></div>
        <Link className='paymentPageBtn' to='/paymentPage'>{'>'}</Link>
      </div>
    </div>
  );
}

export default App;
