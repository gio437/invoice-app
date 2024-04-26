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
      const newName = new ContactName(contactInfo, contactCount);
      const newNumber = new ContactNumber(numberInfo, contactCount);
      setContactName(prev => prev.concat(newName));
      setContactNumber(prev => prev.concat(newNumber));
      // console.log(contactName);
      // have it only update useState after form update?
      // CREATE SEPERATE FUNCTION AFTER GET CONTACT AT THE CLICK EVENT
    }
    else {
      window.alert('Input Name & Number!');
    }
  }

  class ContactName {
    constructor (contactInfo, id) {
      this.contactInfo = contactInfo;
      this.id = id;
    }
  }

  class ContactNumber {
    constructor (numberInfo, id) {
      this.numberInfo = numberInfo;
      this.id = id;
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
      console.log(name);
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
        contactCard.id = contactCount[i];
        contactCard.append(newContact);
        generateNumber(number[i], contactParent, contactCard);
        generateDeleteBtn(contactParent, name[i], contactCard);
      }
    // }
  }
  // setTimeout(displaySavedContacts, 50);

  const deleteContact = (idNum) => {
    // const nameIndex = name.map(function(item) {
    //   return item.id;
    // }).indexOf(idNum);
    // const numberIndex = number.map(function(item) {
    //   return item.id;
    // }).indexOf(idNum);
    // console.log(nameIndex);
    // console.log(name[0].id);

  // Filter out the name and number arrays based on the index to remove
      setContactName(name => (
        name.filter((_, index) => index !== idNum)
      ));
      
    
      setContactNumber(number => (
        number.filter((_, index) => index !== idNum)
      ));
      
  
  // switch the arrays to objects with id values ?? ? ? ? 
    console.log(idNum);
    // console.log(numberIndex);
    console.log(name);
    // nextContactCount(0);
    const contactCard = document.querySelectorAll('.contactCard');
    for (let i = 0; i < contactCard.length; i++) {
      // contactCard[i].id = i;
      if (contactCard[i].id == idNum) {
        contactCard[i].remove();
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