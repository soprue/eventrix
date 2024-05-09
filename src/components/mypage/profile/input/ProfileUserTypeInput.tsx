import React from 'react';

import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Label } from '@components/ui/label';

interface ProfileUserTypeInputProps {
  userType: string;
}

function ProfileUserTypeInput({ userType }: ProfileUserTypeInputProps) {
  return (
    <RadioGroup
      disabled
      defaultValue={userType}
      className='flex w-full justify-center gap-6'
    >
      <div className='flex items-center space-x-3 space-y-0'>
        <RadioGroupItem value='organizer' />
        <Label>주최자</Label>
      </div>
      <div className='flex items-center space-x-3 space-y-0'>
        <RadioGroupItem value='buyer' />
        <Label>참여자</Label>
      </div>
    </RadioGroup>
  );
}

export default React.memo(ProfileUserTypeInput);
