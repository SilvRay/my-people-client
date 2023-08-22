import { useState } from "react";
import { Link } from "react-router-dom";

function Projects({ projects, user }) {
  // Création d'un state pour filtrer les projets à afficher
  const [allOrMyProjects, setAllOrMyProjects] = useState("all");

  // Créer une variable égale dans un 1er temps au state projects
  let filteredOrNotProjects = projects;
  // Si le state pour filtrer les events à afficher égale à "my"
  // filtrer les projects pour n'avoir que ceux créés par le user connecté
  if (allOrMyProjects === "my") {
    filteredOrNotProjects = filteredOrNotProjects.filter((event) => {
      // console.log("el.creator:", el.creator);
      return event.creator._id === user._id;
    });
  }

  return (
    <>
      <h2 className="projects">Projects</h2>

      <div className="filters">
        <span>
          <img
            src={`/images/selected-${
              allOrMyProjects === "all" ? "true" : "false"
            }.png`}
            alt="selection button"
            onClick={() => setAllOrMyProjects("all")}
          />
          all projects
        </span>
        <span>
          <img
            src={`/images/selected-${
              allOrMyProjects === "my" ? "true" : "false"
            }.png`}
            alt="selection button"
            onClick={() => setAllOrMyProjects("my")}
          />
          my projects
        </span>
      </div>

      <div className="projects-container">
        {filteredOrNotProjects.map((project) => {
          return (
            <div key={project._id} className="project-card">
              <h3>{project.title}</h3>
              <img
                src="/images/project-img.jpg"
                alt="a working group in a library"
              />
              <div className="btns-container">
                <Link to={`/projects/${project._id}`}>See</Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Projects;
