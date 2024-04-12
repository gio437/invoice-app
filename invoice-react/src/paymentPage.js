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
        }
    }
    setTimeout(generateContact, 50);

    const generateNumber = (contactCard) => {
        const newNum = document.createElement('div');
        newNum.textContent = props.number;
        newNum.classList.add('contactNumber');
        contactCard.append(newNum);
    }

    return (
        <div className='paymentPage'>
            <header className='paymentPageHeader'>
                <h1>Payment Page</h1>
            </header>
            <div className='main'>
                <label for='paymentNumberInput'>Enter Paymount Amount</label>
                <input type='number' name='paymentNumberInput' placeholder='Payment Amount?'></input>
                <button>Send!</button>
            </div>
            <div className='contactList'></div>
            <Link to='/' className='homePageBtn'>{'<'}</Link>
        </div>
    )
}

export default PaymentPage;