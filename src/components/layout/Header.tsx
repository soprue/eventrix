import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { LogOut, User } from 'lucide-react';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

import logoImage from '@assets/images/logo/logo_horizontal.svg';
import { useUserStore } from '@store/useUserStore';
import { auth } from '@services/firebaseConfig';

function Header() {
  const navigate = useNavigate();
  const user = useUserStore.getState().user;
  console.log(user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header className="border-b border-border/40 h-16 flex items-center">
      <div className="container flex justify-between items-center">
        <Link to={'/'}>
          <img src={logoImage} alt="logo" className="h-6" />
        </Link>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="검색"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 w-[250px]"
          />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user.profileImage} alt="user avatar" />
                  <AvatarFallback>{user.nickname}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-10">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="py-3"
                    onClick={() => navigate('/my')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>마이페이지</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-3" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/signin">로그인</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
