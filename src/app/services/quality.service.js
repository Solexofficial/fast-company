import httpService from './http.service';

const qualityEndpoint = 'quality/';

const qualityService = {
  getAll: async () => {
    const { data } = await httpService.get(qualityEndpoint);
    return data;
  }
};

export default qualityService;
