import { useState } from 'react';
import { useQuery } from 'react-query';
import { GoHeartFill, GoHeart } from 'react-icons/go';

import { getUserLikes } from '@services/eventService';
import useUser from '@hooks/useUser';

interface LikeButtonProps {
  id: string;
}

function LikeButton({ id }: LikeButtonProps) {
  const user = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useQuery(['userLikes', user?.uid], () => getUserLikes(user?.uid as string), {
    enabled: !!user?.uid,
    onSuccess: userLikes => {
      setIsLiked(userLikes?.includes(id));
    },
  });

  return (
    <>
      {isLiked ? (
        <button className='flex size-9 items-center justify-center rounded-full bg-primary'>
          <GoHeartFill fill='white' />
        </button>
      ) : (
        <button className='flex size-9 items-center justify-center rounded-full bg-primary'>
          <GoHeart fill='white' />
        </button>
      )}
    </>
  );
}

export default LikeButton;
