import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import SpinnerBox from '@shared/SpinnerBox';
import AuthStateObserver from '@components/auth/AuthStateObserver';
import PublicRoute from '@components/auth/PublicRoute';
import PrivateRoute from '@components/auth/PrivateRoute';
import GlobalAlertDialog from '@components/layout/GlobalAlertDialog';

import Layout from '@pages/layout/Layout';
import MyPageLayout from '@pages/layout/MyPageLayout';
import MainPage from '@pages/Main';
import { Helmet } from 'react-helmet-async';
import MainSEO from './components/SEO/MainSEO';
const NotFound = lazy(() => import('@pages/404'));
const SearchPage = lazy(() => import('@pages/Search'));
const SignInPage = lazy(() => import('@pages/SignIn'));
const SignUpPage = lazy(() => import('@pages/SignUp'));
const MyPage = lazy(() => import('@pages/mypage/MyPage'));
const MyLikedEventsPage = lazy(() => import('@pages/mypage/MyLikedEvents'));
const MyTicketsPage = lazy(() => import('@pages/mypage/MyTickets'));
const MyEventsPage = lazy(() => import('@pages/mypage/MyEvents'));
const NewEventsPage = lazy(() => import('@pages/mypage/NewEvents'));
const EditEventsPage = lazy(() => import('@pages/mypage/EditEvents'));
const MyManagementPage = lazy(() => import('@pages/mypage/MyManagement'));
const EventDetailPage = lazy(() => import('@pages/EventDetail'));
const RegisterPage = lazy(() => import('@pages/Register'));
const CartPage = lazy(() => import('@pages/Cart'));
const PaymentPage = lazy(() => import('@pages/Payment'));

function App() {
  return (
    <Suspense fallback={<SpinnerBox className='h-dvh' />}>
      <MainSEO />
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

          <Route element={<PrivateRoute allowedTypes='buyer' />}>
            <Route path='/register/:id' element={<RegisterPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/payment' element={<PaymentPage />} />
          </Route>
        </Route>

        <Route element={<MyPageLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path='/mypage' element={<MyPage />} />
          </Route>
          <Route element={<PrivateRoute allowedTypes='buyer' />}>
            <Route path='/mypage/likes' element={<MyLikedEventsPage />} />
            <Route path='/mypage/tickets' element={<MyTicketsPage />} />
          </Route>
          <Route element={<PrivateRoute allowedTypes='organizer' />}>
            <Route path='/mypage/events' element={<MyEventsPage />} />
            <Route path='/mypage/events/new' element={<NewEventsPage />} />
            <Route path='/mypage/events/edit' element={<EditEventsPage />} />
            <Route path='/mypage/management' element={<MyManagementPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
