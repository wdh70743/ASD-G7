import React, { useState, useEffect } from 'react';
import Project from './Project';
import '../Tasks/Styles/TaskList.css';

const ProjectList = ({userId, projects, createProject, updateProject, deleteProject}) => {

  const [projectList, setProjectList] = useState(projects || []);
  const [projectForm, setProjectForm] = useState(false);
  const [newTaskButtonColor, setNewTaskButtonColor] = useState('#007BFF');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [projectPriority, setProjectPriority] = useState('Medium');
  const [editingIndex, setEditingIndex] = useState(null);


  const toggleForm = () => {
    const newColor = !projectForm ? 'red' : '#007BFF';
    setNewTaskButtonColor(newColor);
    setProjectForm(!projectForm);
    if (projectForm) resetForm();
  };

  const resetForm = () => {
    setProjectName('');
    setProjectDescription('');
    setProjectPriority('Medium');
    setProjectStartDate('');
    setProjectEndDate('');
    setEditingIndex(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = { 
      user_ids: [userId],
      owner: userId,
      projectname: projectName, 
      description: projectDescription, 
      start_date: projectStartDate,
      end_date: projectEndDate,
      priority: projectPriority,
      status: true,
    };

    if (editingIndex !== null) {
      console.log('Editing project with ID:', projectList[editingIndex].id);
      const projectId = projectList[editingIndex].id;
      await updateProject(projectId, newProject);
    } else {
      await createProject(newProject);

    }

    resetForm();
    setProjectForm(false);
    setNewTaskButtonColor('#007BFF');
  };

  const handleEditProject = (projectId) => {
    const project = projectList.find(t => t.id === projectId);
    if (project) {
      setProjectName(project.projectname);
      setProjectDescription(project.description);
      setProjectStartDate(project.start_date);
      setProjectEndDate(project.end_date);
      setProjectPriority(project.priority);
      setEditingIndex(projectList.findIndex(t => t.id === projectId));
      setProjectForm(true);
      setNewTaskButtonColor('red');
    } else {
      console.error('Project not found for ID:', projectId);
    }
  };

  const handleDeleteProject = (projectId) => deleteProject(projectId);


  useEffect(() => {
    console.log('Current projects:', projectList);
  }, [projectList]);
  
  return (
    <div className="main-container">
      <div className="task-list-header">
        <div className="projectTitleDescription">
        </div>
        <button 
          onClick={toggleForm} 
          className="new-task-button" 
          style={{ backgroundColor: newTaskButtonColor }}
        >
          {projectForm ? "Cancel Project" : "New Project"}
        </button>
      </div>
      {projectForm && (
        <div className="task-form-list">
          <form className="new-task-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="projectName">Project Name</label>
              <input
                id="projectName"
                type="text"
                placeholder="Enter task name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectDescription">Project Description</label>
              <input
                id="projectDescription"
                type="text"
                placeholder="Enter task description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectStartDate">Start Date</label>
              <input
                id="projectStartDate"
                type="date"
                value={projectStartDate}
                onChange={(e) => setProjectStartDate(e.target.value)}
                required
                className="set-task-date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectEndDate">End Date</label>
              <input
                id="projectEndDate"
                type="date"
                value={projectEndDate}
                onChange={(e) => setProjectEndDate(e.target.value)}
                required
                className="set-task-date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectPriority">Priority</label>
              <select
                id="projectPriority"
                value={projectPriority}
                onChange={(e) => setProjectPriority(e.target.value)}
                className="priority-dropdown"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="submit-button-container">
              <button type="submit" className="submit-button">
                {editingIndex !== null ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      )}
    <div>
      {projectList.length === 0 ? (
          <p>No projects available.</p>
        ) : (
        projectList.map((project) => (
            <Project 
            key = {project.id}
            id = {project.id}
            color="#f0f0f0" 
            title= {project.projectname} 
            description={project.description}
            onEdit={() => handleEditProject(project.id)}
            onDelete={() => handleDeleteProject(project.id)}
          />
        ))
      )}
    </div>
  </div>
);
};
export default ProjectList;

