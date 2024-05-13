import { Link } from 'react-router-dom';

import { Button } from '@components/ui/button';
import SearchForm from '@components/layout/SearchForm';
import UserDropdown from '@components/layout/UserDropdown';

import useUser from '@hooks/useUser';
import logoImage from '@assets/images/logo/logo_horizontal.svg';

function Header() {
  const user = useUser();

  return (
    <header className='flex h-16 items-center border-b border-border/40 tablet:px-6 mobile:h-14 mobile:px-4'>
      <div className='container flex items-center justify-between'>
        <Link to={'/'}>
          <img src={logoImage} alt='logo' className='h-6 mobile:h-5' />
        </Link>

        <div className='flex gap-2 mobile:gap-1'>
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
