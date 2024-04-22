import { NavLink } from 'react-router-dom';
import useUser from '@hooks/useUser';

function MyNavigation() {
  const user = useUser();

  return (
    <div className='flex min-h-[calc(100vh-64px)] w-[200px] flex-col border-r border-gray-200 p-4 pt-10'>
      <nav className='flex flex-col gap-5 text-xl'>
        <NavLink
          to='/my'
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
              to='/my/events'
              className={({ isActive }) =>
                isActive ? 'text-black' : 'text-gray-300'
              }
            >
              이벤트 관리
            </NavLink>
            <NavLink
              to='/my/orders'
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
              to='/my/tickets'
              className={({ isActive }) =>
                isActive ? 'text-black' : 'text-gray-300'
              }
            >
              이벤트 참여 내역
            </NavLink>
            <NavLink
              to='/my/likes'
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