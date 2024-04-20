import Status from '@components/my/events/Status';
import EventTable from '@components/my/events/EventTable';
import { Button } from '@components/ui/button';

function MyEvents() {
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button>등록하기</Button>
      </div>
      <div>
        <Status />
        <EventTable />
      </div>
    </>
  );
}

export default MyEvents;
