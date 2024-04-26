import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { GoHeartFill, GoHeart } from 'react-icons/go';

import { getUserLikes, toggleLikeEvent } from '@services/eventService';
import useUser from '@hooks/useUser';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';

interface LikeButtonProps {
  eventUID: string;
}

function LikeButton({ eventUID }: LikeButtonProps) {
  const user = useUser();
  const { openAlert } = useGlobalAlertStore();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useQuery(['userLikes', user?.uid], () => getUserLikes(user?.uid as string), {
    enabled: !!user?.uid,
    onSuccess: likedEvents => {
      setIsLiked(likedEvents.some(like => like.eventId === eventUID));
    },
  });

  const toggleLikeMutation = useMutation(
    () => toggleLikeEvent(user!.uid as string, eventUID),
    {
      onSuccess: () => {
        setIsLiked(prev => !prev);
      },
      onError: () => {
        openAlert('좋아요 상태 변경에 실패했습니다. 다시 시도해 주세요.', '');
      },
    },
  );

  const handleToggleLike = () => {
    if (!user) {
      openAlert('로그인이 필요한 기능입니다.', '');
      return;
    }
    toggleLikeMutation.mutate();
  };

  return (
    <>
      {isLiked ? (
        <button
          className='flex size-9 items-center justify-center rounded-full bg-primary'
          onClick={handleToggleLike}
          disabled={toggleLikeMutation.isLoading}
        >
          <GoHeartFill fill='white' />
        </button>
      ) : (
        <button
          className='flex size-9 items-center justify-center rounded-full bg-primary'
          onClick={handleToggleLike}
          disabled={toggleLikeMutation.isLoading}
        >
          <GoHeart fill='white' />
        </button>
      )}
    </>
  );
}

export default LikeButton;
