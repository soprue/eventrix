import { Link } from 'react-router-dom';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

import logoImage from '@assets/images/logo/logo_horizontal.svg';
import userImage from '@assets/images/default_user.svg';

function Header() {
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
          <Button variant="outline" asChild>
            <Link to="/signin">로그인</Link>
          </Button>
          {/* <Link to="/my">
            <Avatar>
              <AvatarImage src={userImage} alt="user avatar" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </Link> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
