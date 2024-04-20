import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthStateObserver from '@components/auth/AuthStateObserver';
import PublicRoute from '@components/auth/PublicRoute';
import PrivateRoute from '@components/auth/PrivateRoute';
import GlobalAlertDialog from '@components/layout/GlobalAlertDialog';
import Spinner from '@components/shared/Spinner';

import Layout from '@pages/Layout';
import MainPage from '@pages/Main';
const SignInPage = lazy(() => import('@pages/SignIn'));
const SignUpPage = lazy(() => import('@pages/SignUp'));
const MyPage = lazy(() => import('@pages/MyPage'));

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
      <GlobalAlertDialog />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MainPage />} />

          {/* Public Routes */}
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/my"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />

          {/* <Route path="/*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
