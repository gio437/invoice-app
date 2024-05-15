import '../styling/App.css';
import React from 'react';
import { Link } from 'react-router-dom';
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";

function App({switchedPage, setSwitchedPage, nextContactCount, contactCount, setContactName, setContactNumber, name, number}) {

  const getContact = (event) => {
    // change all of these to ID
    const inputField = document.querySelector('.contactInputField');
    const numberField = document.querySelector('.numberInputField');
    const categoryField = document.getElementById('categorys');
    const contactInfo = inputField.value;
    const numberInfo = numberField.value;
    const categoryInfo = categoryField.value;
    
    generateContact(contactInfo, numberInfo, categoryInfo);
    inputField.value = '';
    numberField.value = '';
    categoryField.selectedIndex = 0;
    event.preventDefault();
  }

  const generateContact = (contactInfo, numberInfo, categoryInfo) => {
    if (contactInfo !== '' && numberInfo !== '' && categoryInfo != '') {
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

      generateNumber(numberInfo, contactParent, contactCard); // re using function to generate other values besides number
      generateNumber(categoryInfo, contactParent, contactCard);
      generateBalance(contactCount, contactParent, contactCard, 'INV', 'INVNO');
      // generateDeleteBtn(contactParent, contactInfo, contactCard);

      const newName = new ContactName(contactInfo, contactCount, contactCount, categoryInfo);
      const newNumber = new ContactNumber(numberInfo, contactCount);
      setContactName(prev => prev.concat(newName));
      setContactNumber(prev => prev.concat(newNumber));
    }
    else {
      const title = document.querySelector('h1');
      title.textContent = 'Input All Fields!';
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
    constructor (contactInfo, id, invoiceNum, category) {
      this.contactInfo = contactInfo;
      this.id = id;
      this.balance = 0;
      this.invoiceNum = invoiceNum;
      this.category = category;
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

  const generateBalance = (balanceInfo, contactParent, contactCard, property, className) => {
    const balanceDiv = document.createElement('div');
    const balanceStr = property + balanceInfo;
    balanceDiv.textContent = balanceStr;
    balanceDiv.classList.add(className);
    contactCard.append(balanceDiv);
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
        generateNumber(name[i].category, contactParent, contactCard);
        // generateExistingDeleteBtn(contactParent, contactCard, i);
        generateBalance(name[i].invoiceNum, contactParent, contactCard, 'INV', 'INVNO');
        generateBalance(name[i].balance, contactParent, contactCard, 'Balance: $', 'cardBalance');
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

  const clearContacts = () => {
    const existingContactCards = document.querySelectorAll('.contactCard');
        existingContactCards.forEach(card => {
            card.style.backgroundColor = 'white';
        })
}

  const findInvoice = (event) => {
    let invoiceTextBox = document.querySelector('.invoiceTextBox');
    let textVal = invoiceTextBox.value;
    const invoiceNumber = document.querySelectorAll('.INVNO');
    const contactCards = document.querySelectorAll('.contactCard');
    const appTitle = document.querySelector('h1');
    clearContacts();
    for (let i = 0; i < name.length; i++) {
      console.log(name[i].invoiceNum);
      console.log(textVal);
      console.log(invoiceNumber[i].innerHTML);
      if (name[i].invoiceNum == textVal) {
        if (invoiceNumber[i].innerHTML === 'INV' + name[i].invoiceNum) {
              contactCards[i].scrollIntoView(true);
              contactCards[i].style.backgroundColor = 'lightblue';
              appTitle.textContent = 'Invoice Num Found!';
              appTitle.style.color = '#0056b3';
              textVal = '';
              i = 100000;
              setTimeout(switchTitle, 3000);
        }
      }
      else {
        appTitle.textContent = 'Invoice Num Not Found!';
        appTitle.style.color = '#0056b3';
        setTimeout(switchTitle, 3000);
      }
    }
    event.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice App</h1>
        <div className='invoiceBtn'>
          <input className='invoiceTextBox' type="text" placeholder="Search Invoice No." name="search"></input>
          <button onClick={findInvoice} type="submit"><i className="fa fa-search"></i>&#x1F50E;</button>
        </div>
      </header>
      <div className='main'>
        <div className='input-contacts'>
          <form onSubmit={getContact}>
            <label htmlFor='contact-input'>Contact</label>
            <input className='contactInputField' type='text' name='contact-input' placeholder='Contact Name'></input>
            <label htmlFor='number-input'>Phone Number</label>
            <input className='numberInputField' name='number-input' placeholder='Phone Number' type="text"></input>
            <label htmlFor="categorys">Choose a category:</label>
            <select name="categorys" id="categorys">
              <option value=""></option>
              <option value="Payrolls">Payrolls</option>
              <option value="Products">Products</option>
              <option value="Materials">Materials</option>
              <option value="Out-Sourced-Services">Out-Sourced-Services</option>
            </select>
            <div></div>
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