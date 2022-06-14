const USE_LOCAL = true;

export const environment = {
  production: false,
  serverUrl: USE_LOCAL ? 'http://localhost:8080/api' : 'https://homee.io-labs.fr/api',
  API_KEY_PIXABAY: '21558043-ea93c1b6a6e88758325a9fcb2'
};
