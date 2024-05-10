import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User, ShoppingCart } from 'lucide-react';
import { signOut } from 'firebase/auth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

import { UserType } from '@/types/user';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import { useCartStore } from '@store/useCartStore';
import { auth } from '@services/firebaseConfig';

interface UserDropdownProps {
  user: UserType;
}

function UserDropdown({ user }: UserDropdownProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const { openAlert } = useGlobalAlertStore();
  const { cartItems } = useCartStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate(from);
    } catch (error) {
      openAlert('로그아웃에 실패했습니다.', error as string);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-cy='user-drop-down-menu'>
        <Avatar className='mobile:size-8 cursor-pointer'>
          <AvatarImage src={user.profileImage} alt='user avatar' />
          <AvatarFallback>{user.nickname}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-10'>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className='mobile:py-2 mobile:text-sm py-3'
            onClick={() => navigate('/mypage')}
          >
            <User className='mr-2 size-4' />
            <span>마이페이지</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {user.userType === 'buyer' && (
            <>
              <DropdownMenuItem
                className='mobile:py-2 mobile:text-sm py-3'
                onClick={() => navigate('/cart')}
                data-cy='cart-button'
              >
                <ShoppingCart className='mr-2 size-4' />
                <span>
                  장바구니{' '}
                  <span className='inline-flex size-6 items-center justify-center  rounded-full bg-black text-white'>
                    {cartItems.length}
                  </span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            className='mobile:py-2 mobile:text-sm py-3'
            onClick={handleLogout}
            data-cy='signout-button'
          >
            <LogOut className='mr-2 size-4' />
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
