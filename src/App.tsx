import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '@components/layout/Layout';
const Spinner = lazy(() => import('@shared/Spinner'));
const SignInPage = lazy(() => import('@pages/SignIn'));

function App() {
  return (
    <Suspense
      fallback={
        <div
          role="status"
          className="flex h-dvh w-full items-center justify-center"
        >
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<SignInPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
