import React, { useState } from 'react';
import { buyElectricty } from '../services/electricity';
import { errorClass } from '../utils/errorChecker';
import FormErrors from './FormErrors';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function BuyToken() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    amount: 0,
    meter: 0,
    formErrors: { amount: '', meter: '' },
    amountValid: false,
    meterValid: false,
    formValid: false,
  });
  const [field, setField] = useState({ name: '', value: '' });

  const handleChange = (property, value) => {
    setForm({ ...form, [property]: value });
    setField({ name: property, value: value });
  };

  useEffect(() => {
    let fieldValidationErrors = { ...form.formErrors };
    let amountValid = form.amountValid;
    let meterValid = form.meterValid;

    switch (field.name) {
      case 'amount':
        amountValid = field.value % 100 === 0 || field.value > 182500;
        fieldValidationErrors.amount = amountValid
          ? ''
          : 'must be a multiple of 100 and less than 182,500';
        break;
      case 'meter':
        meterValid = field.value.length === 6;
        fieldValidationErrors.meter = meterValid
          ? ''
          : ' must be 6 characters.';
        break;
      default:
        break;
    }
    setForm((form) => ({
      ...form,
      formErrors: fieldValidationErrors,
      amountValid: amountValid,
      meterValid: meterValid,
      formValid: amountValid && meterValid,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.name, field.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await buyElectricty({ amount: form.amount, meter: form.meter });
    navigate(`/info/${res.meter_id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Buy Electricity</h3>
      <FormErrors formErrors={form.formErrors} />
      <div className={`form-group ${errorClass(form.formErrors.meter)}`}>
        <label>Meter Number</label>
        <input
          autoFocus
          required
          type="number"
          className="form-control my-2"
          name="meter"
          placeholder="Enter your meter number"
          value={form.meter}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>
      <div className={`form-group ${errorClass(form.formErrors.amount)}`}>
        <label>Amount</label>
        <input
          required
          type="number"
          name="amount"
          className="form-control my-2"
          placeholder="Enter amount of money"
          value={form.amount}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="mt-2 btn btn-primary btn-block py-2 px-5"
        disabled={!form.formValid}
      >
        Buy
      </button>
    </form>
  );
}
