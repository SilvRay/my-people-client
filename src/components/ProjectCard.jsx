import { Link } from "react-router-dom";

function ProjectCard({ projects }) {
  return (
    <div className="projects-container">
      {projects.map((project) => {
        return (
          <div key={project._id} className="project-card">
            <h3>{project.title}</h3>
            <img
              src="../../images/project-img.jpg"
              alt="a working group in a library"
            />
            <div className="btns-container">
              <Link to="/events/:eventId">See</Link>
              <button>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectCard;
