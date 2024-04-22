import './App.css';
import React, { useEffect } from 'react';
import { useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import CreatedContacts from './createdContacts';
import RouteSwitch from './RouterSwitch';

function App({nextContactCount, contactCount, setContactName, setContactNumber, name, number}) {

  const getContact = (event) => {
    // change all of these to ID
    const inputField = document.querySelector('.contactInputField');
    const numberField = document.querySelector('.numberInputField');
    const contactInfo = inputField.value;
    const numberInfo = numberField.value;
    generateContact(contactInfo, numberInfo);
    inputField.value = '';
    numberField.value = '';
    event.preventDefault();
  }

  const generateContact = (contactInfo, numberInfo) => {
    // const numberRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    // match ids when deleting by length - 1
    if (contactInfo !== '' && numberInfo !== '') {
      // props.newContact(contactInfo, numberInfo);
      const contactParent = document.querySelector('.contactList');
      const contactCard = document.createElement('div');
      contactCard.classList.add('contactCard');
      contactParent.append(contactCard);
      const newContact = document.createElement('div');
      newContact.textContent = contactInfo;
      newContact.classList.add('contactName');
      contactCard.id = contactCount;
      contactCard.append(newContact);
      nextContactCount(prev => prev + 1); // increment ID for each contact
      generateNumber(numberInfo, contactParent, contactCard);
      generateDeleteBtn(contactParent, contactInfo, contactCard);
      setContactName(prev => prev.concat(contactInfo));
      setContactNumber(prev => prev.concat(numberInfo));
      // console.log(contactName);
      // have it only update useState after form update?
      // CREATE SEPERATE FUNCTION AFTER GET CONTACT AT THE CLICK EVENT
    }
    else {
      window.alert('Input Name & Number!');
    }
  }

  const generateNumber = (numberInfo, contactParent, contactCard) => {
    const newNum = document.createElement('div');
    newNum.textContent = numberInfo;
    newNum.classList.add('contactNumber');
    contactCard.append(newNum);
  }

  const generateDeleteBtn = (contactParent, contactInfo, contactCard) => {
    if (contactInfo !== '') {
      const newBtn = document.createElement('button');
      newBtn.classList.add('contactDeleteBtn');
      newBtn.textContent = 'X';
      newBtn.id = contactCount;
      contactCard.append(newBtn);
      newBtn.addEventListener('click', () => {
        deleteContact(parseInt(newBtn.id));
      });
    }
  }

  const displaySavedContacts = () => {
    const contactParent = document.querySelector('.contactList');
    const existingContactCards = document.querySelectorAll('.contactCard');

    existingContactCards.forEach(card => {
      card.remove();
    });

    
    for (let i = 0; i < name.length; i++) {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contactCard');
        contactParent.append(contactCard);
        const newContact = document.createElement('div');
        newContact.textContent = name[i];
        newContact.classList.add('contactName');
        contactCard.id = contactCount;
        contactCard.append(newContact);
        generateNumber(number[i], contactParent, contactCard);
        generateDeleteBtn(contactParent, name[i], contactCard);
      }
    // }
  }
  // setTimeout(displaySavedContacts, 50);

  const deleteContact = (idNum) => {
  // Filter out the name and number arrays based on the index to remove
  setContactName(prevArray => (
    prevArray.filter((_, index) => index !== idNum)
  ));

  setContactNumber(prevArray => (
    prevArray.filter((_, index) => index !== idNum)
  ));

    console.log(idNum);
    console.log(name);
    nextContactCount(0);
    const contactCard = document.querySelectorAll('.contactCard');
    for (let i = 0; i < contactCard.length; i++) {
      if (contactCard[i].id == idNum) {
        contactCard[i].remove();
      }
      contactCard[i].id = contactCount;
      nextContactCount(prev => prev + 1);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice App</h1>
      </header>
      <div className='main'>
        <div className='input-contacts'>
          <form onSubmit={getContact}>
            <label htmlFor='contact-input'>Input Contact</label>
            <input className='contactInputField' type='text' name='contact-input' placeholder='New Contact?' pattern='[a-z]'></input>
            <label htmlFor='number-input'>Input Phone Number</label>
            <input className='numberInputField' name='number-input' placeholder='Number?' type="number"></input> 
            <button className='submitContactBtn' onClick={getContact}>Enter</button>
          </form>
        </div>
        <div className='contactList'></div>
        <Link className='paymentPageBtn' to='/paymentPage'>{'>'}</Link>
      </div>
    </div>
  );
}

export default App;