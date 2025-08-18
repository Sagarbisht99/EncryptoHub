// app/payment/page.tsx

import React, { Suspense } from "react";
import PaymentClient from "./PaymentClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading payment status...</div>}>
      <PaymentClient />
    </Suspense>
  );
}
