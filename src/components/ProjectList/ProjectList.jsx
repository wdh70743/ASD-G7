import React, { useState, useEffect } from 'react';
import Project from './Project';
import '../Tasks/Styles/TaskList.css';

const ProjectList = ({ userId, projects, createProject, updateProject, deleteProject }) => {
  const [projectList, setProjectList] = useState(projects || []);
  const [projectForm, setProjectForm] = useState(false);
  const [newProjectButtonColor, setNewProjectButtonColor] = useState('#007BFF');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [projectPriority, setProjectPriority] = useState('Medium');
  const [editingIndex, setEditingIndex] = useState(null);

  const toggleForm = () => {
    const newColor = !projectForm ? 'red' : '#007BFF';
    setNewProjectButtonColor(newColor);
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
      status: false,
    };

    if (editingIndex !== null) {
      const projectId = projectList[editingIndex].id;
      await updateProject(projectId, newProject);
    } else {
      await createProject(newProject);
    }

    resetForm();
    setProjectForm(false);
    setNewProjectButtonColor('#007BFF');
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
      setNewProjectButtonColor('red');
    } else {
      console.error('Project not found for ID:', projectId);
    }
  };

  const handleDeleteProject = (projectId) => deleteProject(projectId);

  const handleArchiveProject = async (projectId) => {
    const projectToUpdate = projectList.find(p => p.id === projectId);
    if (!projectToUpdate) return;

    const newArchivedState = !projectToUpdate.isArchived;
    await updateProject(projectId, { ...projectToUpdate, isArchived: newArchivedState });
    setProjectList(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId ? { ...project, isArchived: newArchivedState } : project
      )
    );
  };

  const toggleProjectStatus = async (projectId) => {
    const projectToUpdate = projectList.find(project => project.id === projectId);
    if (projectToUpdate) {
      const newStatus = !projectToUpdate.status;
      await updateProject(projectId, {projectToUpdate, status: newStatus });
      setProjectList(prevProjects =>
        prevProjects.map(project =>
          project.id === projectId ? { ...project, status: newStatus } : project
        )
      );
    }
  };

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  return (
    <div className="main-container">
      <div className="task-list-header">
        <button 
          onClick={toggleForm} 
          className="new-task-button" 
          style={{ backgroundColor: newProjectButtonColor }}
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
                placeholder="Enter project name"
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
                placeholder="Enter project description"
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
              key={project.id}
              id={project.id}
              color="#f0f0f0" 
              title={project.projectname} 
              description={project.description}
              startDate={project.start_date}
              endDate={project.end_date}
              priority={project.priority}
              status={project.status}
              isArchived={project.isArchived}
              onEdit={() => handleEditProject(project.id)}
              onDelete={() => handleDeleteProject(project.id)}
              onToggleStatus={() => toggleProjectStatus(project.id)}
              onArchive={() => handleArchiveProject(project.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;
