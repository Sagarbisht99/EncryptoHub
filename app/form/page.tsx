// app/form/page.tsx

import React, { Suspense } from "react";
import FormClient from "./FormClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <FormClient />
    </Suspense>
  );
}
