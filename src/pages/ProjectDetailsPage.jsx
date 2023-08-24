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
  }, [projectId]);

  // Fonction pour formater l'heure au format HH:MM
  // const formatTime = (date) => {
  //   const options = { hour: "2-digit", minute: "2-digit" };
  //   return new Date(date).toLocaleTimeString(undefined, options);
  // };

  if (!project) return "loading...";

  return (
    <>
      <div className="project-page">
        <div>
          <img
            src={`/my-people-client/images/project-img.jpg`}
            alt="project-img"
          />
        </div>

        <div>
          <p>
            {project.creator.username} created the{" "}
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default ProjectDetailsPage;
