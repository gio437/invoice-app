import './paymentPage.css';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import App from './App';

function PaymentPage(props) {
    console.log(props.name);
    console.log(props.number);
    const generateContact = () => {
        if (props.name != '' && props.number != '') {
            const contactParent = document.querySelector('.contactList');
            const contactCard = document.createElement('div');
            contactCard.classList.add('contactCard');
            contactParent.append(contactCard);
            const newContact = document.createElement('div');
            newContact.textContent = props.name;
            newContact.classList.add('contactName');
            contactCard.append(newContact);
            generateNumber(contactCard);
            contactCard.addEventListener('click', () => {
                sendPayment(); // to clear contact selection
                contactCard.style.backgroundColor = 'lightblue';
                contactCard.forEach(card => { // reset car activation
                    card.id = 0;
                })
                contactCard.id = 1;
            })
        }
    }
    setTimeout(generateContact, 50);

    const generateNumber = (contactCard) => {
        const newNum = document.createElement('div');
        newNum.textContent = props.number;
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
        contactCard.forEach(card => {
            if (card.id == 1) {
                paymentTitle.textContent = 'Sent!';
                paymentTitle.style.color = '#0056b3';
                card.id = 0;
                setTimeout(changePaymentTitle, 5000);
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
                <label className='paymentTitle' for='paymentNumberInput'>Enter Paymount Amount</label>
                <input className='paymentField' type='number' name='paymentNumberInput' placeholder='Payment Amount?'></input>
                <button onClick={sendPayment}>Send!</button>
            </div>
            <h2 className='contactTitle'>Contacts - Select One</h2>
            <div className='contactList'></div>
            <Link to='/' className='homePageBtn'>{'<'}</Link>
        </div>
    )
}

export default PaymentPage;