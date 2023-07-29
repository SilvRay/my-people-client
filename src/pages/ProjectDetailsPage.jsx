import { useState, useEffect } from "react";
import myaxios from "../myaxios";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function ProjectDetailsPage() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    myaxios
      .get(`/api/projects/${projectId}`)
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  }, []);

  // Fonction pour formater l'heure au format HH:MM

  if (!project) return "loading...";

  return (
    <>
      <div className="project-single-header">
        <div>
          <img src={`../../images/${event.type}.jpg`} alt="" />
          <p>
            {project.creator} created the {project.createdAt}
          </p>
          <p>{project.title}</p>
          <p>{project.description}</p>
        </div>
      <NavBar/>
      </div>
    </>
  );
}

export default ProjectDetailsPage;
