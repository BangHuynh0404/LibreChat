import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import MarketplaceSidebar from '../MarketplaceSidebar';

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
  useCategories: () => ({ categories: [{ value: 'code', label: 'Code', icon: null }] }),
}));

describe('MarketplaceSidebar', () => {
  const defaultProps = {
    activeView: 'marketplace' as const,
    activeKind: 'all' as const,
    activeCategory: 'all' as const,
    onSelectView: jest.fn(),
    onSelectKind: jest.fn(),
    onSelectCategory: jest.fn(),
    counts: { tool: 2, skill: 3, mcp: 1, action: 0, builtin: 5 },
  };

  test('shows the sidebar title', () => {
    render(<MarketplaceSidebar {...defaultProps} />);
    expect(screen.getByText('com_ui_tools_marketplace')).toBeInTheDocument();
  });

  test('clicking a view filter calls onSelectView', () => {
    const onSelectView = jest.fn();
    render(<MarketplaceSidebar {...defaultProps} onSelectView={onSelectView} />);
    fireEvent.click(screen.getByText('com_ui_tools_view_favorites'));
    expect(onSelectView).toHaveBeenCalledWith('favorites');
  });

  test('clicking a kind filter calls onSelectKind', () => {
    const onSelectKind = jest.fn();
    render(<MarketplaceSidebar {...defaultProps} onSelectKind={onSelectKind} />);
    fireEvent.click(screen.getByText('com_ui_tools_kind_skills'));
    expect(onSelectKind).toHaveBeenCalledWith('skill');
  });

  test('clicking a category calls onSelectCategory', () => {
    const onSelectCategory = jest.fn();
    render(<MarketplaceSidebar {...defaultProps} onSelectCategory={onSelectCategory} />);
    fireEvent.click(screen.getByText('Code'));
    expect(onSelectCategory).toHaveBeenCalledWith('code');
  });

  test('renders the Create new button', () => {
    render(<MarketplaceSidebar {...defaultProps} />);
    expect(screen.getByText('com_ui_tools_create_new')).toBeInTheDocument();
  });
});
