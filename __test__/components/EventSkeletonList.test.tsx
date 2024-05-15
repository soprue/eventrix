import { expect } from '@jest/globals';
import { render } from '@testing-library/react';

import EventSkeletonList from '@shared/EventSkeletonList';

describe('EventSkeletonList 공통 컴포넌트 테스트', () => {
  it('오류 없이 렌더링된다.', () => {
    const { container } = render(<EventSkeletonList />);
    expect(container).toBeInTheDocument();
  });

  it('cols prop에 따라 올바른 그리드 클래스가 적용된다.', () => {
    const { rerender, getByTestId } = render(<EventSkeletonList cols={1} />);
    expect(getByTestId('skeleton-list')).toHaveClass('grid-cols-1');

    rerender(<EventSkeletonList cols={2} />);
    expect(getByTestId('skeleton-list')).toHaveClass('grid-cols-2');

    rerender(<EventSkeletonList cols={3} />);
    expect(getByTestId('skeleton-list')).toHaveClass('grid-cols-3');

    rerender(<EventSkeletonList cols={4} />);
    expect(getByTestId('skeleton-list')).toHaveClass('grid-cols-4');
  });

  it('12개의 스켈레톤 항목을 렌더링한다.', () => {
    const { getAllByTestId } = render(<EventSkeletonList />);
    const skeletonItems = getAllByTestId('skeleton-item');
    expect(skeletonItems.length).toBe(12);
  });
});
