import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import TaskList from './components/Tasks/Components/TaskList'
import useTasks from './hooks/useTasks';
import userEvent from '@testing-library/user-event';

// Mock the useTasks hook
jest.mock('./hooks/useTasks');

const mockTasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    start_date: '2023-10-01T00:00:00Z',
    due_date: '2023-10-02T00:00:00Z',
    priority: 'Medium',
    status: false,
  },
];

beforeEach(() => {
  localStorage.clear();
});

test('renders loading state', () => {
  useTasks.mockReturnValue({
    tasks: [],
    loading: true,
    fetchTasksByProject: jest.fn(),
    deleteTask: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
  });

  render(
    <Router>
      <TasksPage />
    </Router>
  );

  expect(screen.getByText(/Loading tasks.../)).toBeInTheDocument();
});

test('renders login prompt if user is not logged in', () => {
  useTasks.mockReturnValue({
    tasks: [],
    loading: false,
    fetchTasksByProject: jest.fn(),
    deleteTask: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
  });

  render(
    <Router>
      <TasksPage />
    </Router>
  );

  expect(screen.getByText(/Please log in to view your tasks./)).toBeInTheDocument();
});

test('renders task list when tasks are fetched', async () => {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', start_date: '2023-10-01T00:00:00.000Z', due_date: '2023-10-02T00:00:00.000Z', priority: 'Medium', status: false },
    { id: 2, title: 'Task 2', description: 'Description 2', start_date: '2023-10-03T00:00:00.000Z', due_date: '2023-10-04T00:00:00.000Z', priority: 'High', status: true },
  ];

  // Mocking useTasks to return tasks
  useTasks.mockReturnValue({
    tasks: tasks,
    loading: false,
    fetchTasksByProject: jest.fn(),
    deleteTask: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
  });

  // Simulate a logged-in user
  localStorage.setItem('userId', '123');

  render(
    <Router>
      <TasksPage />
    </Router>
  );

  // Check if each task title is rendered correctly
  tasks.forEach(task => {
    expect(screen.getByText(new RegExp(task.title, 'i'))).toBeInTheDocument();
  });

  // Simulate clicking each task title to reveal details
  for (const task of tasks) {
    const titleElement = screen.getByText(new RegExp(task.title, 'i'));

    // Use userEvent to click the title
    userEvent.click(titleElement);

    // Now, check if the task description is rendered correctly
    const descriptionElement = await screen.findByText(new RegExp(task.description, 'i'));

    // Assert that the description is now in the document
    expect(descriptionElement).toBeInTheDocument();
  }
});

test('allows user to access the edit task form', async () => {
  // Mock function props
  const deleteTask = jest.fn();
  const createTask = jest.fn();
  const updateTask = jest.fn();

  render(
    <Router>
      <TaskList 
        userId="1" 
        tasks={mockTasks} 
        projectId="1" 
        deleteTask={deleteTask} 
        createTask={createTask} 
        updateTask={updateTask} 
      />
    </Router>
  );

  // Click on the "Edit" button for Task 1
  fireEvent.click(screen.getByText(/Edit/i));

  // Check that the form appears
  expect(screen.getByLabelText(/Task Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Task Description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();

  // Verify that the task details are pre-filled in the form
  expect(screen.getByLabelText(/Task Name/i)).toHaveValue('Task 1');
  expect(screen.getByLabelText(/Task Description/i)).toHaveValue('Description 1');
  expect(screen.getByLabelText(/Priority/i)).toHaveValue('Medium');
  expect(screen.getByLabelText(/Start Date/i)).toHaveValue('2023-10-01');
  expect(screen.getByLabelText(/End Date/i)).toHaveValue('2023-10-02');

  // Simulate form submission (if necessary)
  fireEvent.change(screen.getByLabelText(/Task Name/i), { target: { value: 'Updated Task 1' } });
  fireEvent.click(screen.getByText(/Update Task/i));

  // Assert that updateTask was called with the correct arguments
  expect(updateTask).toHaveBeenCalledWith(mockTasks[0].id, expect.objectContaining({
    title: 'Updated Task 1',
    description: 'Description 1',
    start_date: expect.any(String), 
    due_date: expect.any(String), 
    priority: 'Medium',
  }));
});







