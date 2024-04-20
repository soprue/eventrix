import { Link } from 'react-router-dom';

import Status from '@components/my/events/Status';
import EventTable from '@components/my/events/EventTable';
import { Button } from '@components/ui/button';

function MyEvents() {
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button>
          <Link to="/my/events/new">등록하기</Link>
        </Button>
      </div>
      <div>
        <Status />
        <EventTable />
      </div>
    </>
  );
}

export default MyEvents;
