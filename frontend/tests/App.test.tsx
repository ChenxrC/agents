import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
    post: vi.fn()
  }
}));

test('renders app title', async () => {
  render(<App />);
  expect(screen.getByText('多智能体控制台')).toBeInTheDocument();
}); 