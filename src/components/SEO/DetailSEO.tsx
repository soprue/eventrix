import { Helmet } from 'react-helmet-async';

import { EventType } from '@/types/event';

interface DetailSEOProps {
  eventData: EventType;
}

function DetailSEO({ eventData }: DetailSEOProps) {
  return (
    <Helmet>
      <title>{eventData?.name} - EVENTRIX</title>
      <meta property='og:description' content={eventData?.name} />
      <meta property='og:image' content={eventData?.thumbnail} />
      <meta
        property='og:url'
        content={`https://eventrix.vercel.app/event/${eventData?.uid}`}
      />
      <meta name='twitter:description' content={eventData?.name} />
      <meta name='twitter:image' content={eventData?.thumbnail} />
      <meta
        name='twitter:url'
        content={`https://eventrix.vercel.app/event/${eventData?.uid}`}
      />
    </Helmet>
  );
}

export default DetailSEO;
