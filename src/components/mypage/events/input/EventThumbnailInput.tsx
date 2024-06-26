import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MdOutlineFileUpload } from 'react-icons/md';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import InputTitle from '@shared/InputTitle';

import { EventFormValues } from '@/types/form';
import resizeAndConvertImage from '@utils/resizeAndConvertImage';

interface EventThumbnailInputProps {
  thumbnailPreview: string | null;
  setThumbnailPreview: Dispatch<SetStateAction<string | null>>;
  form: UseFormReturn<EventFormValues>;
}

function EventThumbnailInput({
  thumbnailPreview,
  setThumbnailPreview,
  form,
}: EventThumbnailInputProps) {
  const handleThumbnailChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      const webpImageBlob = await resizeAndConvertImage(file);
      const webpImageFile = new File([webpImageBlob], `${file.name}.webp`, {
        type: 'image/webp',
        lastModified: new Date().getTime(),
      });

      const smallImageBlob = await resizeAndConvertImage(file, 500);
      const smallImageFile = new File(
        [smallImageBlob],
        `${file.name}_small.webp`,
        {
          type: 'image/webp',
          lastModified: new Date().getTime(),
        },
      );

      // 이전 이미지 URL을 해제
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }

      form.setValue('thumbnail', webpImageFile, { shouldValidate: true });
      form.setValue('smallThumbnail', smallImageFile, { shouldValidate: true });

      // 이미지 미리보기 설정
      const imageUrl = URL.createObjectURL(webpImageFile);
      setThumbnailPreview(imageUrl);
    } else {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
      setThumbnailPreview(null);
    }
  };

  return (
    <div className='flex flex-col space-y-2'>
      <InputTitle title='썸네일' />
      {thumbnailPreview ? (
        <div className='flex h-[320px] w-full items-center justify-center overflow-hidden rounded-md border border-input tablet:h-[270px] mobile:h-[200px] '>
          <img
            src={thumbnailPreview}
            alt='Thumbnail Preview'
            className='size-full object-cover'
          />
        </div>
      ) : (
        <div className='flex h-[320px] w-full items-center justify-center overflow-hidden rounded-md border border-input tablet:h-[270px] mobile:h-[200px]'>
          <p className='text-center text-sm text-gray-500'>썸네일 미리보기</p>
        </div>
      )}
      <div className='flex justify-end'>
        <label
          htmlFor='picture'
          className='inline-flex h-fit cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-xs font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
        >
          <MdOutlineFileUpload />
          업로드
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
                {...form.register('thumbnail')}
                onChange={handleThumbnailChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name='smallThumbnail'
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                id='picture'
                type='file'
                accept='image/*'
                className='hidden'
                {...form.register('smallThumbnail')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default React.memo(EventThumbnailInput);
