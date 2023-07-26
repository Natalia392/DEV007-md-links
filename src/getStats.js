// Función para obtener las estadísticas de los enlaces

const getLinksStats = (links, optionValidate) => new Promise((resolve, reject) => {
  try {
    const stats = {
      total: links.length,
      unique: new Set(links.map((link) => link.href)).size,
    };
    if (optionValidate) {
      stats.broken = links.filter((link) => link.ok === 'FAIL').length;
      stats.working = links.filter((link) => link.ok === 'OK').length;
    }
    resolve(stats);
  } catch (error) {
    reject(error.message);
  }
});

export default getLinksStats;
