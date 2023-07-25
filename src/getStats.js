// Función para obtener las estadísticas de los enlaces
const getLinksStats = (links, optionValidate) => new Promise((resolve, reject) => {
  try {
    const totalLinks = links.length;
    const uniqueLinks = new Set(links.map((link) => link.href)).size;
    const BrokenLinks = links.filter((link) => link.ok === 'FAIL').length;
    const stats = {
      total: totalLinks,
      unique: uniqueLinks,
      broken: BrokenLinks,
    };
    if (optionValidate) {
      totalLinks.working = links.filter((link) => link.ok === 'OK'.length);
      totalLinks.broken = links.filter((link) => link.ok === 'FAIL'.length);
    }
    resolve(stats);
  } catch (error) {
    reject(error.message);
  }
});

export default getLinksStats;
