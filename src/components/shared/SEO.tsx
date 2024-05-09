import { Helmet } from 'react-helmet-async';

import { EventType } from '@/types/event';

interface SEOProps {
  eventData?: EventType;
}

function SEO({ eventData }: SEOProps) {
  const isEventPage = Boolean(eventData);
  const title =
    isEventPage && eventData ? `${eventData.name} - EVENTRIX` : 'EVENTRIX';
  const description =
    isEventPage && eventData
      ? eventData.name
      : '마음에 드는 이벤트를 찾아보세요.';
  const imageUrl =
    isEventPage && eventData
      ? eventData.thumbnail
      : import.meta.env.VITE_OG_IMAGE_URL;
  const url =
    isEventPage && eventData
      ? `https://eventrix.vercel.app/event/${eventData.uid}`
      : 'https://eventrix.vercel.app';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content='이벤트, 티켓, 예매, 행사' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content='website' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={imageUrl} />
      <meta name='twitter:url' content={url} />
      <meta property='og:locale' content='ko_KR' />
    </Helmet>
  );
}

export default SEO;
