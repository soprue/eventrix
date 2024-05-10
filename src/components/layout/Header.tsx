import { Link } from 'react-router-dom';

import { Button } from '@components/ui/button';
import SearchForm from '@components/layout/SearchForm';
import UserDropdown from '@components/layout/UserDropdown';

import useUser from '@hooks/useUser';
import logoImage from '@assets/images/logo/logo_horizontal.svg';

function Header() {
  const user = useUser();

  return (
    <header className='tablet:px-6 mobile:px-4 mobile:h-14 flex h-16 items-center border-b border-border/40'>
      <div className='container flex items-center justify-between'>
        <Link to={'/'}>
          <img src={logoImage} alt='logo' className='mobile:h-5 h-6' />
        </Link>

        <div className='mobile:gap-1 flex gap-2'>
          <SearchForm />
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <Button variant='outline' className='mobile:h-8' asChild>
              <Link to='/signin'>로그인</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
