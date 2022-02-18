import React, { useEffect, useState } from 'react';
import { getMeterByNumber, getTokenByMeterId } from '../services/electricity';
import { errorClass } from '../utils/errorChecker';
import FormErrors from './FormErrors';

export default function CheckDays() {
  const [form, setForm] = useState({
    meter: 0,
    formErrors: { meter: '' },
    meterValid: false,
    formValid: false,
  });

  const [tokenInfo, setTokenInfo] = useState('');
  const [field, setField] = useState({ name: '', value: '' });

  const handleChange = (property, value) => {
    setForm({ ...form, [property]: value });
    setField({ name: property, value: value });
  };

  useEffect(() => {
    let fieldValidationErrors = { ...form.formErrors };
    let meterValid = form.meterValid;

    switch (field.name) {
      case 'meter':
        meterValid = field.value.length === 6;
        fieldValidationErrors.meter = meterValid ? '' : ' is invalid';
        break;
      default:
        break;
    }

    setForm((form) => ({
      ...form,
      formErrors: fieldValidationErrors,
      meterValid: meterValid,
      formValid: meterValid,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.name, field.value.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const meter = await getMeterByNumber(form.meter);

    const res = await getTokenByMeterId(meter.id);

    setTokenInfo(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Check the days remaining</h3>
      <p>Find out the number of days remaining</p>
      <FormErrors formErrors={form.formErrors} />
      <div className={`form-group ${errorClass(form.formErrors.meter)}`}>
        <label>Enter meter</label>
        <input
          required
          type="number"
          name="meter"
          className="form-control my-2"
          placeholder="Find number of days remaining"
          value={form.meter}
          onChange={(e) => handleChange('meter', e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="mt-2 btn btn-primary btn-block py-2 px-5"
        disabled={!form.formValid}
      >
        Search
      </button>
      {tokenInfo && <p>{tokenInfo}</p>}
    </form>
  );
}
