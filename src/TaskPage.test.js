import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import useTasks from './hooks/useTasks';

// Mock the useTasks hook
jest.mock('./hooks/useTasks');

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

