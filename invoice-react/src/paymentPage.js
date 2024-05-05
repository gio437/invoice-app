import './paymentPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import App from './App';

function PaymentPage({setSwitchedPage, name, number, setContactName, setContactNumber, nextContactCount}) {
    const [balance, setBalance] = useState(1000000);

    const generateContact = () => {
        console.log(name);
        setSwitchedPage(1);
        for (let i = 0; i < name.length; i++) {
            const contactParent = document.querySelector('.contactList');
            const contactCard = document.createElement('div');
            contactCard.classList.add('contactCard');
            contactParent.append(contactCard);
    
            const newContact = document.createElement('div');
            newContact.textContent = name[i].contactInfo; // Access each name for this iteration
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
    useEffect(() => {
        generateContact();
    }, []);

    const clearContacts = () => {
        const existingContactCards = document.querySelectorAll('.contactCard');
            existingContactCards.forEach(card => {
                card.style.backgroundColor = 'white';
                card.id = 0;
            })
    }
    
    const generateNumber = (contactCard, number) => {
        const newNum = document.createElement('div');
        newNum.textContent = number.numberInfo; // Use the passed number for this iteration
        newNum.classList.add('contactNumber');
        contactCard.append(newNum);
        
        //Reset all stored data
        // setContactName([]);
        // setContactNumber([]);
        // nextContactCount(0);
    }

    const sendPayment = () => {
        const contactCard = document.querySelectorAll('.contactCard');
        for (let i = 0; i < contactCard.length; i++) {
            contactCard[i].style.backgroundColor = 'white';
        }
         notifySentPayment(contactCard);
    }

    const notifySentPayment = (contactCard) => {
        const paymentTitle = document.querySelector('h1');
        const paymentField = document.querySelector('.paymentField');
        for (let i = 0; i < contactCard.length; i++) {
            setTimeout(defaultPaymentTitle, 3000);
            hideSwitchPageBtn();
            if (contactCard[i].id == 1 && paymentField.value !== '') {
                console.log('Sent!');
                paymentTitle.textContent = 'Sent!';
                paymentTitle.style.color = '#0056b3';
                applyPayment(contactCard[i], paymentField.value);
                contactCard[i].id = 0;
                paymentField.value = '';
                i = 100000;
            }
            else {
                console.log('Wrong!');
                paymentTitle.textContent = 'Select Contact & Payment Amount!';
                paymentTitle.style.color = '#0056b3';
                contactCard[i].id = 0;
            }
        }
    }

    const applyPayment = (selectedCard, selectedPayment) => {
        setBalance(prev => prev - selectedPayment);
        const balanceDiv = document.createElement('div');
        balanceDiv.textContent = selectedPayment;
        balanceDiv.classList.add('cardBalance');
        // selectedPayment.style.color = 'red';
        selectedCard.append('Balance: ' + '$' + selectedPayment);
    }

    const hideSwitchPageBtn = () => {
        const btn = document.querySelector('.homePageBtn');
        btn.style.display = 'none';
        setTimeout(showSwitchPageBtn, 3000);
    } 

    const showSwitchPageBtn = () => {
        const btn = document.querySelector('.homePageBtn');
        btn.style.display = 'block';
    }


    const defaultPaymentTitle = () => {
        const paymentTitle = document.querySelector('h1');
        paymentTitle.textContent = 'Enter Payment Amount';
        paymentTitle.style.color = 'white';
    }

    return (
        <div className='paymentPage'>
            <header className='paymentPageHeader'>
                <h1>Payment Page</h1>
            </header>
            <div className='main'>
                <label className='paymentTitle' htmlFor='paymentNumberInput'>Enter Paymount Amount - Balance: ${balance}</label>
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