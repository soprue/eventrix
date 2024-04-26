import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthStateObserver from '@components/auth/AuthStateObserver';
import PublicRoute from '@components/auth/PublicRoute';
import PrivateRoute from '@components/auth/PrivateRoute';
import GlobalAlertDialog from '@components/layout/GlobalAlertDialog';
import SpinnerBox from '@components/shared/SpinnerBox';

import Layout from '@pages/layout/Layout';
import MyPageLayout from '@pages/layout/MyPageLayout';
import MainPage from '@pages/Main';
const NotFound = lazy(() => import('@pages/404'));
const SearchPage = lazy(() => import('@pages/Search'));
const SignInPage = lazy(() => import('@pages/SignIn'));
const SignUpPage = lazy(() => import('@pages/SignUp'));
const MyPage = lazy(() => import('@pages/my/MyPage'));
const MyEventsPage = lazy(() => import('@pages/my/MyEvents'));
const NewEventsPage = lazy(() => import('@pages/my/NewEvents'));
const EditEventsPage = lazy(() => import('@pages/my/EditEvents'));
const EventDetailPage = lazy(() => import('@pages/EventDetail'));

function App() {
  return (
    <Suspense fallback={<SpinnerBox className='h-dvh' />}>
      <AuthStateObserver />
      <GlobalAlertDialog />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/event/:id' element={<EventDetailPage />} />

          <Route element={<PublicRoute />}>
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
          </Route>
        </Route>

        <Route element={<MyPageLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path='/my' element={<MyPage />} />
          </Route>
          <Route element={<PrivateRoute allowedTypes='organizer' />}>
            <Route path='/my/events' element={<MyEventsPage />} />
            <Route path='/my/events/new' element={<NewEventsPage />} />
            <Route path='/my/events/edit' element={<EditEventsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
