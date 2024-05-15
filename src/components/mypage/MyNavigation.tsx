import { NavLink } from 'react-router-dom';
import useUser from '@hooks/useUser';

function MyNavigation() {
  const user = useUser();

  return (
    <div className='flex min-h-[calc(100dvh-64px)] w-[200px] flex-col border-r border-border/40 p-4 pt-10 tablet:w-[180px] tablet:pt-8 mobile:h-fit mobile:min-h-fit mobile:w-full mobile:items-center mobile:py-6'>
      <nav className='flex flex-col gap-5 text-xl tablet:text-lg mobile:flex-row'>
        <NavLink
          to='/mypage'
          end
          className={({ isActive }) =>
            isActive ? 'text-black' : 'text-gray-300'
          }
        >
          프로필
        </NavLink>
        {user?.userType === 'organizer' && (
          <>
            <NavLink
              to='/mypage/events'
              className={({ isActive }) =>
                isActive ? 'text-black' : 'text-gray-300'
              }
            >
              이벤트 관리
            </NavLink>
            <NavLink
              to='/mypage/management'
              className={({ isActive }) =>
                isActive ? 'text-black' : 'text-gray-300'
              }
            >
              주문 관리
            </NavLink>
          </>
        )}
        {user?.userType === 'buyer' && (
          <>
            <NavLink
              to='/mypage/tickets'
              className={({ isActive }) =>
                isActive ? 'text-black' : 'text-gray-300'
              }
            >
              이벤트 참여 내역
            </NavLink>
            <NavLink
              to='/mypage/likes'
              className={({ isActive }) =>
                isActive ? 'text-black' : 'text-gray-300'
              }
            >
              찜한 이벤트
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default MyNavigation;
