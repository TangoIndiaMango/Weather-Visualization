import { describe, test, expect, vi } from 'vitest'

describe('Mock Cleanup', () => {
  const mockFunction = vi.fn()
  
  test('should clear all mocks after each test', () => {
    // Setup: Call mock function
    mockFunction('test')
    expect(mockFunction).toHaveBeenCalledTimes(1)
    
    // Clear mocks
    vi.clearAllMocks()
    
    // Verify mocks are cleared
    expect(mockFunction).toHaveBeenCalledTimes(0)
  })

  test('should reset mock implementation', () => {
    // Setup: Mock implementation
    mockFunction.mockImplementation(() => 'mocked value')
    const result = mockFunction()
    expect(result).toBe('mocked value')
    
    // Clear mocks
    vi.clearAllMocks()
    
    // Verify implementation is reset
    const afterClear = mockFunction()
    expect(afterClear).toBeUndefined()
  })

  test('should clear mock call history', () => {
    // Setup: Multiple mock calls
    mockFunction('call1')
    mockFunction('call2')
    expect(mockFunction.mock.calls).toHaveLength(2)
    
    // Clear mocks
    vi.clearAllMocks()
    
    // Verify call history is cleared
    expect(mockFunction.mock.calls).toHaveLength(0)
  })

  test('should maintain mock function identity', () => {
    // Store original mock function reference
    const originalMock = mockFunction
    
    // Clear mocks
    vi.clearAllMocks()
    
    // Verify function reference remains the same
    expect(mockFunction).toBe(originalMock)
  })
})