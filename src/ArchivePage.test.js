// archivePage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ArchivePage from './pages/ArchivePage';
import useProjects from './hooks/useProjects';
import useTasks from './hooks/useTasks';
import userEvent from '@testing-library/user-event';

// Mock the hooks used in the ArchivePage
jest.mock('./hooks/useProjects');
jest.mock('./hooks/useTasks');

const mockProjects = [
  { id: 1, projectname: 'Web Development' },
  { id: 2, projectname: 'Mobile App' },
];

const mockArchivedTasks = [
  { id: 1, title: 'Archived Task 1', project: 1, description: 'Description 1', priority: 'High', archived_at: '2023-10-02T00:00:00Z' },
  { id: 2, title: 'Archived Task 2', project: 2, description: 'Description 2', priority: 'Medium', archived_at: '2023-10-03T00:00:00Z' },
];

beforeEach(() => {
  // Reset localStorage and mock hook values
  localStorage.clear();

  useProjects.mockReturnValue({
    projects: mockProjects,
    fetchProjectsByUser: jest.fn(),
    loading: false,
    error: null,
  });

  useTasks.mockReturnValue({
    archivedTasks: mockArchivedTasks,
    fetchArchivedTasksByUser: jest.fn(),
    deleteTask: jest.fn(),
    loading: false,
    error: null,
  });
});

test('renders ArchivePage with projects and their archived tasks', () => {
  render(
    <Router>
      <ArchivePage />
    </Router>
  );

  // Check if project names are rendered
  expect(screen.getByText(/Web Development/i)).toBeInTheDocument();
  expect(screen.getByText(/Mobile App/i)).toBeInTheDocument();

  // Check if archived tasks are rendered correctly
  expect(screen.getByText(/Archived Task 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Archived Task 2/i)).toBeInTheDocument();
});

test('searches and filters archived tasks using SearchBar', () => {
  render(
    <Router>
      <ArchivePage />
    </Router>
  );

  // Verify initial state: all tasks should be visible
  expect(screen.getByText(/Archived Task 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Archived Task 2/i)).toBeInTheDocument();

  // Enter a search term in the SearchBar to filter tasks
  fireEvent.change(screen.getByPlaceholderText(/Search archived tasks/i), { target: { value: 'Task 1' } });

  // Click the search button
  fireEvent.click(screen.getByText(/Search/i));

  // After search, only "Archived Task 1" should be visible
  expect(screen.getByText(/Archived Task 1/i)).toBeInTheDocument();
  expect(screen.queryByText(/Archived Task 2/i)).not.toBeInTheDocument();
});

test('sorts archived tasks by priority using SearchBar', () => {
  render(
    <Router>
      <ArchivePage />
    </Router>
  );

  // Select "Priority" in the sort dropdown
  fireEvent.change(screen.getByDisplayValue('Sort by'), { target: { value: 'priority' } });

  // Click the search button
  fireEvent.click(screen.getByText(/Search/i));

  // After sorting, ensure the correct order by checking the order of elements
  const taskTitles = screen.getAllByRole('heading', { level: 3 }); // Get all task titles (h3)
  expect(taskTitles[0].textContent).toBe('Archived Task 1'); // High priority should come first
  expect(taskTitles[1].textContent).toBe('Archived Task 2'); // Medium priority should come second
});

test('calls deleteTask when delete button is clicked in ArchivePage', () => {
  const mockDeleteTask = jest.fn();

  // Re-mock useTasks to include mockDeleteTask
  useTasks.mockReturnValue({
    archivedTasks: mockArchivedTasks,
    fetchArchivedTasksByUser: jest.fn(),
    deleteTask: mockDeleteTask,
    loading: false,
    error: null,
  });

  render(
    <Router>
      <ArchivePage />
    </Router>
  );

  // Click on the "Delete" button for "Archived Task 1"
  fireEvent.click(screen.getAllByText(/Delete/i)[0]);

  // Assert that deleteTask was called with the correct task ID
  expect(mockDeleteTask).toHaveBeenCalledWith(mockArchivedTasks[0].id);
});
