import React, { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import DaumPostcodeEmbed from 'react-daum-postcode';

import { Input } from '@components/ui/input';
import InputTitle from '@shared/InputTitle';

import { EventFormValues } from '@/types/form';

export interface PostcodeType {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

interface EventLocationInputProps {
  form: UseFormReturn<EventFormValues>;
  location: string;
  isPostcodeOpen: boolean;
  togglePostcode: () => void;
  setIsPostcodeOpen: Dispatch<SetStateAction<boolean>>;
}

function EventLocationInput({
  form,
  location,
  isPostcodeOpen,
  togglePostcode,
  setIsPostcodeOpen,
}: EventLocationInputProps) {
  const handlePostcodeComplete = (data: PostcodeType) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    form.setValue('location', fullAddress);
    setIsPostcodeOpen(false);
  };

  return (
    <div className='flex flex-col space-y-2'>
      <Input
        type='hidden'
        {...form.register('location', {
          required: '이벤트 장소 입력은 필수입니다.',
        })}
        value={location}
        onChange={({ target }) => form.setValue('location', target.value)}
      />

      <InputTitle title='이벤트 장소' />

      <div
        className='w-full cursor-pointer overflow-hidden rounded-md border border-input px-3 py-2 text-sm'
        onClick={togglePostcode}
      >
        {location ? location : '주소를 검색해 주세요.'}
      </div>
      {form.formState.errors.location && (
        <p className='text-sm font-medium text-destructive'>
          {form.formState.errors.location.message}
        </p>
      )}
      {isPostcodeOpen && (
        <div>
          <DaumPostcodeEmbed
            onComplete={handlePostcodeComplete}
            autoClose
            className='z-10 h-[450px] w-full'
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(EventLocationInput);
