import { useState } from 'react';

import PaymentReady from '@components/payment/PaymentReady';
import PaymentDone from '@components/payment/PaymentDone';

const LAST_STEP = 2;

function Payment() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <PaymentReady setStep={setStep} />}
      {step === LAST_STEP && <PaymentDone />}
    </>
  );
}

export default Payment;
