import './App.css';
import React, { useEffect } from 'react';
import { useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import CreatedContacts from './createdContacts';

function App({setContactName, setContactNumber}) {
  const [contactCount, nextContactCount] = useState(0);

  const getContact = (event) => {
    // change all of these to ID
    const inputField = document.querySelector('.contactInputField');
    const numberField = document.querySelector('.numberInputField');
    const contactInfo = inputField.value;
    const numberInfo = numberField.value;
    generateContact(contactInfo, numberInfo);
    inputField.value = '';
    console.log(numberField.value);
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
      //CREATE SEPERATE FUNCTION AFTER GET CONTACT AT THE CLICK EVENT
    }
    else {
      window.alert('Input Name & Number!');
    }
  }

  const displaySavedContacts = () => {
    // hold state in seperate js file?
    // use createContext
    const storedContactNames = JSON.parse(sessionStorage.getItem('contactName'));
    const storedContactNumbers = JSON.parse(sessionStorage.getItem('contactNumber'));
    console.log(storedContactNames);
    if (storedContactNames.length !== 0) {
      for (let i = 0; i < storedContactNames.length; i++) {
        generateContact(storedContactNames, storedContactNumbers);
      }
      // sessionStorage.clear();
    }
  }
  
  // useEffect(() => {
  //    // displaySavedContacts(); 
  // }, []); // Run only once when the component mounts
  


  // useEffect(() => {
  //   sessionStorage.setItem('contactName', JSON.stringify(contactName));
  // }, [contactName]);
  
  // useEffect(() => {
  //   sessionStorage.setItem('contactNumber', JSON.stringify(contactNumber));
  // }, [contactNumber]);


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

  const deleteContact = (idNum) => {
    setContactName(prev => prev.splice(idNum, 1));
    setContactNumber(prev => prev.splice(idNum, 1));
    console.log(idNum);
    const contactCard = document.querySelectorAll('.contactCard');
    console.log(contactCard.id);
    for (let i = 0; i < contactCard.length; i++) {
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