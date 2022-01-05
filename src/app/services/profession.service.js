import httpService from './http.service';

const professionEndpoint = 'profession/';

const professionService = {
  getAll: async () => {
    const { data } = await httpService.get(professionEndpoint);
    return data;
  }
};

export default professionService;
