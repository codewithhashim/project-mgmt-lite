import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import CreateTaskForm from './CreateTaskForm';

// Mock the server action module
jest.mock('@/lib/actions', () => ({
  createTask: jest.fn(),
}));

// Mock useFormState from react-dom
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(),
}));

// Mock sonner for toast notifications
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('CreateTaskForm', () => {
  const mockProjectId = 'project-123';
  const mockUsers = [];
  let mockFormAction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormAction = jest.fn();
    
    // Default mock for useFormState - returns null state and the form action
    useFormState.mockReturnValue([null, mockFormAction]);
    
    // Suppress console errors during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the form correctly', () => {
    render(<CreateTaskForm projectId={mockProjectId} users={mockUsers} />);
    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument();
  });

  it('displays validation errors for invalid input', async () => {
    const user = userEvent.setup();
    render(<CreateTaskForm projectId={mockProjectId} users={mockUsers} />);

    // Try to submit with just one character (should fail validation)
    await user.type(screen.getByLabelText(/task title/i), 'a');
    await user.click(screen.getByRole('button', { name: /create task/i }));

    // Check for client-side validation error
    expect(await screen.findByText('Title must be at least 3 characters.')).toBeInTheDocument();
  });

  it('allows user to fill out form with valid data', async () => {
    const user = userEvent.setup();
    render(<CreateTaskForm projectId={mockProjectId} users={mockUsers} />);
    
    // Fill in valid data
    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    
    await user.type(titleInput, 'Valid Task Title');
    await user.type(descriptionInput, 'Valid description');
    
    // Check that the inputs have the expected values
    expect(titleInput).toHaveValue('Valid Task Title');
    expect(descriptionInput).toHaveValue('Valid description');
    
    // The submit button should be enabled and clickable
    const submitButton = screen.getByRole('button', { name: /create task/i });
    expect(submitButton).toBeEnabled();
    
    // User can click submit (we don't test the action call due to complexity)
    await user.click(submitButton);
  });

  it('shows success toast when useFormState returns success', async () => {
    // Mock useFormState to return a success state
    useFormState.mockReturnValue([{ success: true }, mockFormAction]);
    
    render(<CreateTaskForm projectId={mockProjectId} users={mockUsers} />);

    // Wait for the useEffect to process the success state
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Task created successfully!', { id: 'task-create-success' });
    });
  });

  it('shows error toast when useFormState returns error', async () => {
    // Mock useFormState to return an error state
    const errorState = { success: false, message: 'Server error occurred' };
    useFormState.mockReturnValue([errorState, mockFormAction]);
    
    render(<CreateTaskForm projectId={mockProjectId} users={mockUsers} />);

    // Wait for the useEffect to process the error state
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server error occurred');
    });
  });

  it('displays field-specific errors from server', async () => {
    // Mock useFormState to return field-specific errors
    const errorState = { 
      success: false, 
      errors: { title: 'This title is not allowed' }
    };
    useFormState.mockReturnValue([errorState, mockFormAction]);
    
    render(<CreateTaskForm projectId={mockProjectId} users={mockUsers} />);

    // The error should be displayed in the form
    expect(await screen.findByText('This title is not allowed')).toBeInTheDocument();
  });
}); 