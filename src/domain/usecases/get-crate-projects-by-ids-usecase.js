export async function getCrateProjectsByIDs(ids) {
	const fetchPromises = ids.map(id =>
	  fetch(`https://pptgamespt.wixsite.com/crate/_functions/api/v3/projects/id/${id}`)
	    .then(response => {
	      if (response.ok) {
	        return response.json();
	      }
	      return { error: `Falhou ao buscar o jogo ${id}` };
	    })
	    .catch(() => ({ error: `Erro ao buscar o jogo ${id}` }))
	);

	const gamesData = await Promise.all(fetchPromises);
	return gamesData;
}