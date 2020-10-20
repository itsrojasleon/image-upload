import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useInputText } from '../use-input-text';

describe('Use Input Hook', () => {
  it('should use input', () => {
    const { result } = renderHook(() => useInputText(''));

    expect(result.current.value).toBe('');
  });
});
