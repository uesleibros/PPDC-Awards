export function slugToTitle(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function fetchProjectDetails(project_id) {
  const response = await fetch(`https://pptgamespt.wixsite.com/crate/_functions/api/v3/projects/id/${project_id}`);
  if (!response.ok) throw new Error(`Erro ao buscar o título do projeto ${project_id}`);
  const projectData = await response.json();
  return projectData;
}

export const authorizedList = ["764259870563631114", "808627555027910676", "616386370063302686", "480338857724739594", "532970259422904340"];