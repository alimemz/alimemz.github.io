/** @param {string} url */
export const fetchLocal = (importedJSON) =>
  new Promise((resolve) =>
    setTimeout(() => {
      return resolve({
        json: () => ({
          items: JSON.parse(importedJSON).items,
        }),
      });
    }, 1000)
  );
