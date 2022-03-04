const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const requisicaoAPI = async () => {
  try {
    const response = await fetch(APIURL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default requisicaoAPI;
