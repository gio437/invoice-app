import './paymentPage.css';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function PaymentPage() {
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
            <Link to='/' className='homePageBtn'>{'<'}</Link>
        </div>
    )
}

export default PaymentPage;