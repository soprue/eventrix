import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem } from '@components/ui/form';
import { Input } from '@components/ui/input';

function SearchForm() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = (data: string) => {
    if (data) navigate(`/search?q=${data}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: { search: string }) =>
          onSubmit(data.search),
        )}
      >
        <FormField
          control={form.control}
          name='search'
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  {...form.register('search', {
                    setValueAs: value => value.trim(),
                  })}
                  type='text'
                  placeholder='검색'
                  className='tablet:w-[220px] w-[250px] focus-visible:ring-0 focus-visible:ring-offset-0'
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default SearchForm;
