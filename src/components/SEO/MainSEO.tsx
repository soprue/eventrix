import { Helmet } from 'react-helmet-async';

function MainSEO() {
  return (
    <Helmet>
      <title>EVENTRIX</title>
      <meta name='description' content='마음에 드는 이벤트를 찾아보세요.' />
      <meta name='keywords' content='이벤트, 티켓, 예매, 행사' />
      <meta property='og:title' content='EVENTRIX' />
      <meta
        property='og:description'
        content='마음에 드는 이벤트를 찾아보세요.'
      />
      <meta property='og:image' content={import.meta.env.VITE_OG_IMAGE_URL} />
      <meta property='og:url' content='https://eventrix.vercel.app' />
      <meta property='og:type' content='website' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content='EVENTRIX' />
      <meta
        name='twitter:description'
        content='마음에 드는 이벤트를 찾아보세요.'
      />
      <meta name='twitter:image' content={import.meta.env.VITE_OG_IMAGE_URL} />
      <meta name='twitter:url' content='https://eventrix.vercel.app' />
      <meta property='og:locale' content='ko_KR' />
    </Helmet>
  );
}

export default MainSEO;
