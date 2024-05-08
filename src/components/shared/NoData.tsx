import noDataImage from '@assets/images/master_plan_illustration.svg';

function NoData() {
  return (
    <div
      className='my-10 flex flex-col items-center justify-center gap-20'
      data-cy='noData'
    >
      <img src={noDataImage} alt='no data image' className='w-80' />
      <p className='text-xl font-medium'>이벤트가 없습니다.</p>
    </div>
  );
}

export default NoData;
