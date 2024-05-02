import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import DaumPostcodeEmbed from 'react-daum-postcode';

import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Input } from '@components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { PaymentFormValues } from '@/types/form';
import { PostcodeType } from '@/components/mypage/events/input/EventLocationInput';

interface PaymentFormProps {
  form: UseFormReturn<PaymentFormValues>;
  onSubmit: (data: PaymentFormValues) => void;
  isPaymentProcessing: boolean;
}

function PaymentForm({
  form,
  onSubmit,
  isPaymentProcessing,
}: PaymentFormProps) {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);

  const deliveryMethod = form.watch('deliveryMethod');
  const deliveryAddress = form.watch('deliveryAddress');

  const togglePostcode = () => {
    if (deliveryMethod !== '배송') return;
    setIsPostcodeOpen(prev => !prev);
  };

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

    form.setValue('deliveryAddress', fullAddress);
    setIsPostcodeOpen(false);
  };

  useEffect(() => {
    if (deliveryMethod === '현장 수령') {
      setIsPostcodeOpen(false);
    }
  }, [deliveryMethod]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <p className='mb-8 text-2xl'>티켓 수령 방법</p>
        <FormField
          control={form.control}
          name='deliveryMethod'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center gap-8'>
                    <FormControl className='flex-none'>
                      <RadioGroupItem value='현장 수령' />
                    </FormControl>
                    <div className='!mt-0 grow'>
                      <FormLabel className='!text-base font-normal'>
                        현장 수령
                      </FormLabel>
                    </div>
                  </FormItem>
                  <FormItem className='flex items-baseline gap-8'>
                    <FormControl className='flex-none'>
                      <RadioGroupItem value='배송' />
                    </FormControl>
                    <div className='!mt-0 grow'>
                      <FormLabel className='!text-base font-normal'>
                        배송
                      </FormLabel>
                      <div className='mt-4 flex w-full flex-col gap-2'>
                        <div
                          className={`${deliveryMethod !== '배송' && 'cursor-not-allowed opacity-50'} ${!deliveryAddress && 'text-muted-foreground'} w-full cursor-pointer overflow-hidden rounded-md border border-input px-3 py-2 text-sm`}
                          onClick={togglePostcode}
                        >
                          {deliveryAddress || '주소를 검색해 주세요.'}
                        </div>
                        {isPostcodeOpen && (
                          <div>
                            <DaumPostcodeEmbed
                              onComplete={handlePostcodeComplete}
                              autoClose
                              className='z-10 h-[450px] w-full'
                            />
                          </div>
                        )}
                        <Input
                          disabled={!(deliveryMethod === '배송')}
                          type='text'
                          placeholder='상세 주소를 입력해 주세요.'
                        />
                        <Input
                          disabled={!(deliveryMethod === '배송')}
                          type='text'
                          placeholder='배송 메시지를 입력해 주세요.'
                        />
                      </div>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isPaymentProcessing}
          className='mt-10 w-full'
        >
          결제하기
        </Button>
      </form>
    </Form>
  );
}

export default PaymentForm;
