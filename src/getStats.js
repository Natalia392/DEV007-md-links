// Función para obtener las estadísticas de los enlaces
const getLinksStats = (links) => new Promise((resolve, reject) => {
  try {
    const totalLinks = links.length;
    const uniqueLinks = new Set(links.map((link) => link.href)).size;
    const BrokenLinks = links.filter((link) => link.ok === 'FAIL').length;
    const stats = {
      total: totalLinks,
      unique: uniqueLinks,
      broken: BrokenLinks,
    };
    resolve(stats);
  } catch (error) {
    reject(error.message);
  }
});

export default getLinksStats;
