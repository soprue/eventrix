import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { GoPlus } from 'react-icons/go';

import { FormControl, FormField, FormItem } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

import { ProfileFormValues } from '@/types/form';
import resizeAndConvertImage from '@utils/resizeAndConvertImage';

interface ProfileImageInputProps {
  nickname: string;
  imagePreview: string | null;
  setImagePreview: Dispatch<SetStateAction<string>>;
  form: UseFormReturn<ProfileFormValues>;
}

function ProfileImageInput({
  nickname,
  imagePreview,
  setImagePreview,
  form,
}: ProfileImageInputProps) {
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const webpImageBlob = await resizeAndConvertImage(file, 700);

      // Blob을 File 객체로 변환
      const webpImageFile = new File([webpImageBlob], `${file.name}.webp`, {
        type: 'image/webp',
        lastModified: new Date().getTime(),
      });

      // 이전 이미지 URL을 해제
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // 이미지 미리보기 설정
      form.setValue('profileImage', webpImageFile, { shouldValidate: true });
      const imageUrl = URL.createObjectURL(webpImageFile);
      setImagePreview(imageUrl);
    } else {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    }
  };

  return (
    <div className='!my-12 flex w-full justify-center'>
      <div className='relative size-32'>
        <Avatar className='size-full'>
          <AvatarImage
            src={imagePreview!}
            className='object-cover'
            alt='user avatar'
          />
          <AvatarFallback>{nickname}</AvatarFallback>
        </Avatar>
        <label
          htmlFor='picture'
          className='absolute bottom-0 right-0 flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-white'
        >
          <GoPlus className='size-6' fill='#aaa' />
        </label>
      </div>
      <FormField
        name='thumbnail'
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                id='picture'
                type='file'
                accept='image/*'
                className='hidden'
                {...form.register('profileImage')}
                onChange={handleImageChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

export default React.memo(ProfileImageInput);
