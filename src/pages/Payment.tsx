import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import PaymentReady from '@components/payment/PaymentReady';
import PaymentDone from '@components/payment/PaymentDone';
import ErrorBox from '@components/shared/ErrorBox';

import { CartItemType } from '@/types/cart';

const LAST_STEP = 2;

function Payment() {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const state = location.state as CartItemType[];

  return (
    <>
      {!state ? (
        <ErrorBox />
      ) : (
        <>
          {step === 1 && <PaymentReady setStep={setStep} state={state} />}
          {step === LAST_STEP && <PaymentDone />}
        </>
      )}
    </>
  );
}

export default Payment;
