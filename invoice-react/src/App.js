import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';

function App({switchedPage, setSwitchedPage, nextContactCount, contactCount, setContactName, setContactNumber, name, number}) {

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
    if (contactInfo !== '' && numberInfo !== '') {
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
      // generateDeleteBtn(contactParent, contactInfo, contactCard);
      const newName = new ContactName(contactInfo, contactCount);
      const newNumber = new ContactNumber(numberInfo, contactCount);
      setContactName(prev => prev.concat(newName));
      setContactNumber(prev => prev.concat(newNumber));
    }
    else {
      const title = document.querySelector('h1');
      title.textContent = 'Input Contact And Phone Number!';
      title.style.color = '#0056b3';
      const pageSwitchBtn = document.querySelector('.paymentPageBtn');
      pageSwitchBtn.style.display = 'none';
      setTimeout(switchTitle, 3000);
    }
  }

  const switchTitle = () => {
    const title = document.querySelector('h1');
    title.textContent = 'Invoice App';
    title.style.color = 'white';
    const pageSwitchBtn = document.querySelector('.paymentPageBtn');
    pageSwitchBtn.style.display = 'block';
  }

  class ContactName {
    constructor (contactInfo, id) {
      this.contactInfo = contactInfo;
      this.id = id;
      this.balance = 0;
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
  const generateExistingDeleteBtn = (contactInfo, contactCard, i) => {
    if (contactInfo !== '') {
      const newBtn = document.createElement('button');
      newBtn.classList.add('contactDeleteBtn');
      newBtn.textContent = 'X';
      newBtn.id = i;
      contactCard.append(newBtn);
      newBtn.addEventListener('click', () => {
        deleteContact(parseInt(newBtn.id));
      });
      console.log(name);
    }
  }

  const displaySavedContacts = () => {
    const contactParent = document.querySelector('.contactList');
    
    for (let i = 0; i < name.length; i++) {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contactCard');
        contactParent.append(contactCard);
        const newContact = document.createElement('div');
        newContact.textContent = name[i].contactInfo;
        newContact.classList.add('contactName');
        contactCard.id = i;
        contactCard.append(newContact);
        generateNumber(number[i].numberInfo, contactParent, contactCard);
        // generateExistingDeleteBtn(contactParent, contactCard, i);
      }
      setSwitchedPage(0);

  }
  if (switchedPage === 1) {
    setTimeout(displaySavedContacts, 50);
  }

  const deleteContact = (idNum) => {
//     console.log("idNum:", idNum);
//   console.log("name array:", name);
//   console.log("number array:", number);

// const nameIndex = name.map(function(item) {
//     return item.id;
// }).indexOf(idNum);
// console.log("nameIndex:", nameIndex);

// const numberIndex = number.map(function(item) {
//     return item.id;
// }).indexOf(idNum);
// console.log("numberIndex:", numberIndex);


  // Filter out the name and number arrays based on the index to remove
      setContactName(name => (
        name.filter((_, index) => index !== idNum)
      ));
      
    
      setContactNumber(number => (
        number.filter((_, index) => index !== idNum)
      ));
      
  

    console.log(idNum);
    // console.log(numberIndex);
    console.log(name);
    // nextContactCount(0);
    const contactCard = document.querySelectorAll('.contactCard');
    for (let i = 0; i < contactCard.length; i++) {
      // contactCard[i].id = i;
      if (contactCard[i].id === idNum) {
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