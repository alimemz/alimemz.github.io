const randInt = (max) => Math.floor(Math.random() * max);
const dataSource = Array(250)
  .fill(null)
  .map(() => `tt${randInt(100000000)}`)
  .map((id) => [
    id,
    {
      directors: 'Nolan',
    },
  ]);

/** @param {string} url */
export const fetch = (url) =>
  new Promise((resolve) =>
    setTimeout(() => {
      if (url.endsWith('k_h4d6gr2w')) {
        return resolve({
          json: () => ({
            items: dataSource.map(([id, _]) => ({ id })),
          }),
        });
      }
      const urlParts = url.split('/');
      const requestId = urlParts[urlParts.length - 1];
      const result = dataSource.find(([id, _]) => id === requestId);
      return resolve({
        json: () => result[1],
      });
    }, 500)
  );
