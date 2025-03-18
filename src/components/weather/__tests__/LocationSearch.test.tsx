import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import LocationSearch from '../LocationSearch'

describe('LocationSearch Component', () => {
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders search input and button', () => {
    render(<LocationSearch onSearch={mockOnSearch} />)
    
    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument()
    expect(screen.getByRole('button', { type: 'submit' })).toBeInTheDocument()
  })

  test('handles empty input submission', () => {
    render(<LocationSearch onSearch={mockOnSearch} />)
    
    const form = screen.getByTestId('search-form')
    fireEvent.submit(form)
    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  test('handles valid input submission', () => {
    render(<LocationSearch onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Enter city name...')
    const form = screen.getByTestId('search-form')
    
    fireEvent.change(input, { target: { value: 'London' } })
    fireEvent.submit(form)
    
    expect(mockOnSearch).toHaveBeenCalledWith('London')
  })

  test('trims whitespace from input', () => {
    render(<LocationSearch onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Enter city name...')
    const form = screen.getByTestId('search-form')
    
    fireEvent.change(input, { target: { value: '  London  ' } })
    fireEvent.submit(form)
    
    expect(mockOnSearch).toHaveBeenCalledWith('London')
  })
})