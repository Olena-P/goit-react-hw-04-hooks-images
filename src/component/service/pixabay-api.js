function fetchImage(name, page) {
  const KEY = '18992166-123806360f211761da038f5eb';
  const BASE_URL = 'https://pixabay.com/api/';

  return fetch(
    `${BASE_URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Invalid request'));
  });
}

const api = {
  fetchImage,
};

export default api;
