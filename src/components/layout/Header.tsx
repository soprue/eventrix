import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { LogOut, User } from 'lucide-react';

import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import logoImage from '@assets/images/logo/logo_horizontal.svg';
import { auth } from '@services/firebaseConfig';
import useUser from '@hooks/useUser';
import SearchForm from './SearchForm';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const user = useUser();
  const { openAlert } = useGlobalAlertStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate(from);
    } catch (error) {
      openAlert('로그아웃에 실패했습니다.', error as string);
    }
  };

  return (
    <header className='flex h-16 items-center border-b border-border/40'>
      <div className='container flex items-center justify-between'>
        <Link to={'/'}>
          <img src={logoImage} alt='logo' className='h-6' />
        </Link>

        <div className='flex gap-2'>
          <SearchForm />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={user.profileImage} alt='user avatar' />
                  <AvatarFallback>{user.nickname}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-10'>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className='py-3'
                    onClick={() => navigate('/my')}
                  >
                    <User className='mr-2 h-4 w-4' />
                    <span>마이페이지</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='py-3' onClick={handleLogout}>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant='outline' asChild>
              <Link to='/signin'>로그인</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
