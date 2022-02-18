import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ETokenStatus } from '../enums/ETokenStatus';
import { getTokenByMeterId } from '../services/electricity';

export default function TokenInfo() {
  const { id } = useParams();

  const [tokenInfo, setTokenInfo] = useState({
    meter: 0,
    amount: 0,
    duration: 0,
    token_status: ETokenStatus.USED,
  });

  useEffect(() => {
    setTokenInfo(getTokenByMeterId(id).then((res) => res));
  }, [id]);

  return (
    <>
      <h5>Token Information</h5>
      <h6 className="mt-3 mb-2 text-muted">User meter: {tokenInfo.meter}</h6>
      <h6 className="mt-3 mb-2 text-muted">Amount Payed: {tokenInfo.amount}</h6>
      <h6 className="mt-3 mb-2 text-muted">
        Days remaining: {tokenInfo.duration}
      </h6>
      <div className="flex">
        <span className="mt-3 mb-2 text-muted">Token Validity </span>
        <span
          className={`badge ${
            tokenInfo.token_status === ETokenStatus.USED
              ? 'btn-success'
              : 'btn-primary'
          }`}
        >
          {tokenInfo.token_status}
        </span>
      </div>
    </>
  );
}
