import React from 'react';
import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  useTasks.mockReturnValue({
    tasks: tasks,
    loading: false,
    fetchTasksByProject: jest.fn(),
    deleteTask: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
  });

  localStorage.setItem('userId', '123');

  await act(async () => {
    render(
      <Router>
        <TasksPage />
      </Router>
    );
  });

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

// test('allows user to access the edit task form', async () => {
//   const updateTask = jest.fn();

//   await act(async () => {
//     render(
//       <Router>
//         <TaskList
//           userId="1"
//           tasks={mockTasks}
//           projectId="1"
//           updateTask={updateTask}
//         />
//       </Router>
//     );
//   });

//   // Click the "Edit" button
//   await act(async () => {
//     userEvent.click(screen.getByText(/Edit/i));
//   });

//   // Update the form fields and submit
//   await act(async () => {
//     userEvent.clear(screen.getByLabelText(/Task Name/i));
//     userEvent.type(screen.getByLabelText(/Task Name/i), 'Updated Task 1');
//     userEvent.click(screen.getByText(/Update Task/i));
//   });

//   // Adjust the assertion to match all fields
//   expect(updateTask).toHaveBeenCalledWith(
//     mockTasks[0].id,
//     expect.objectContaining({
//       title: 'Updated Task 1',
//       description: 'Description 1',
//       start_date: expect.any(String),
//       due_date: expect.any(String),
//       priority: 'Medium',
//       is_archived: false,
//       owner: '1',
//       project: '1',
//       repeat_interval: null,
//       status: false,
//     })
//   );
// });