import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import EventInfoRow from '@shared/EventInfoRow';

describe('EventInfoRow 공통 컴포넌트 테스트', () => {
  it('라벨과 값이 올바르게 렌더링되어야 한다.', () => {
    render(<EventInfoRow label='Event' value='Wedding' />);
    const label = screen.getByText('Event');
    const value = screen.getByText('Wedding');

    expect(label).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it('사이즈에 따라 올바른 클래스가 적용되어야 한다.', () => {
    const { rerender } = render(
      <EventInfoRow size='lg' label='테스트 라벨' value='테스트 값' />,
    );
    expect(screen.getByText('테스트 값')).toHaveClass('font-semibold');
    expect(screen.getByText('테스트 라벨').parentNode).toHaveClass('text-base');

    rerender(<EventInfoRow size='md' label='테스트 라벨' value='테스트 값' />);
    expect(screen.getByText('테스트 값')).toHaveClass('font-medium');
    expect(screen.getByText('테스트 라벨').parentNode).toHaveClass('text-sm');

    rerender(<EventInfoRow size='sm' label='테스트 라벨' value='테스트 값' />);
    expect(screen.getByText('테스트 값')).toHaveClass('font-medium');
    expect(screen.getByText('테스트 라벨').parentNode).toHaveClass('text-xs');
  });
});
