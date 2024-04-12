import React, { useState } from 'react';
import App from './App';
import PaymentPage from './paymentPage';

function CreatedContacts() {
    const [contactName, setContactName] = useState([]);
    const [contactNumber, setContactNumber] = useState([]);
    
    const newContact = (contactInfo, numberInfo) => {
        setContactName(prev => prev.concat(contactInfo));
        setContactNumber(prev => prev.concat(numberInfo));
        console.log(contactName);
    }
    
    return (
        <div>
            <PaymentPage name={contactName} number={contactNumber} />
            <App newContact={newContact} name={contactName} />
            <div>{contactName}</div>
        </div>
    );
}

export default CreatedContacts;
