import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useInput } from '../use-input';

describe('Use Input Hook', () => {
  it('should use input', () => {
    const { result } = renderHook(() => useInput(''));

    expect(result.current.value).toBe('');
  });
});
