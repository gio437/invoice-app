import './paymentPage.css';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import App from './App';

function PaymentPage({name, number, setContactName, setContactNumber}) {
    console.log(name);
    console.log(number);
    const generateContact = () => {
        for (let i = 0; i < number.length; i++) {
            const contactParent = document.querySelector('.contactList');
            const contactCard = document.createElement('div');
            contactCard.classList.add('contactCard');
            contactParent.append(contactCard);
    
            const newContact = document.createElement('div');
            newContact.textContent = name[i]; // Access each name for this iteration
            newContact.classList.add('contactName');
            contactCard.append(newContact);
    
            generateNumber(contactCard, number[i]); // Pass each number for this iteration
    
            contactCard.addEventListener('click', () => {
                clearContacts();
                contactCard.style.backgroundColor = 'lightblue';
                contactCard.id = 1;
            });
        }
    }
    setTimeout(generateContact, 50);

    const clearContacts = () => {
        const existingContactCards = document.querySelectorAll('.contactCard');
            existingContactCards.forEach(card => {
                card.style.backgroundColor = 'white';
                card.id = 0;
            })
    }
    
    const generateNumber = (contactCard, number) => {
        const newNum = document.createElement('div');
        newNum.textContent = number; // Use the passed number for this iteration
        newNum.classList.add('contactNumber');
        contactCard.append(newNum);
    }

    const sendPayment = () => {
        const contactCard = document.querySelectorAll('.contactCard');
        const paymentField = document.querySelector('.paymentField');
        paymentField.value = '';
        for (let i = 0; i < contactCard.length; i++) {
            contactCard[i].style.backgroundColor = 'white';
        }
         notifySentPayment(contactCard);
    }

    const notifySentPayment = (contactCard) => {
        const paymentTitle = document.querySelector('.paymentTitle');
        const paymentField = document.querySelector('.paymentField')
        contactCard.forEach(card => {
            setTimeout(changePaymentTitle, 4000);
            if (card.id == 1 && paymentField != '') {
                paymentTitle.textContent = 'Sent!';
                paymentTitle.style.color = '#0056b3';
                card.id = 0;
            }
            else {
                paymentTitle.textContent = 'Select Contact & Enter Payment Amount!';
                paymentTitle.style.color = '#0056b3';
            }
        })
    }

    const changePaymentTitle = () => {
        const paymentTitle = document.querySelector('.paymentTitle');
        paymentTitle.textContent = 'Enter Payment Amount';
        paymentTitle.style.color = 'white';
    }

    return (
        <div className='paymentPage'>
            <header className='paymentPageHeader'>
                <h1>Payment Page</h1>
            </header>
            <div className='main'>
                <label className='paymentTitle' htmlFor='paymentNumberInput'>Enter Paymount Amount</label>
                <input className='paymentField' type='number' name='paymentNumberInput' placeholder='Payment Amount?'></input>
                <button onClick={sendPayment}>Send!</button>
            </div>
            <h2 className='contactTitle'>Contacts - Select One</h2>
            <div className='contactList'></div>
            <Link to='/invoice-app' className='homePageBtn'>{'<'}</Link>
        </div>
    )
}

export default PaymentPage;