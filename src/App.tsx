import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthStateObserver from '@services/AuthStateObserver';
import Layout from '@components/layout/Layout';
const Spinner = lazy(() => import('@shared/Spinner'));
const SignInPage = lazy(() => import('@pages/SignIn'));
const SignUpPage = lazy(() => import('@pages/SignUp'));

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
      <AuthStateObserver />

      <Routes>
        <Route element={<Layout />}>
          {/* <Route index element={<Main />} /> */}
          <Route index element={<SignInPage />} />

          {/* Public Routes */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Private Routes */}
          {/* <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <Mypage />
              </PrivateRoute>
            }
          /> */}

          {/* <Route path="/*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
