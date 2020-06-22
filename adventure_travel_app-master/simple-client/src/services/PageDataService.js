import http from "../http-common";
import authHeader from './auth-header';

class PageDataService {
  getAll() {
    return http.get("/pages", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/pages/${id}`);
  }

  getPublished(){
    return http.get(`/pages/published`);
  }

  create(data) {
    return http.post("/pages", data, { headers: authHeader()});
  }

  update(id, data) {
    return http.put(`/pages/${id}`, data, { headers: authHeader()});
  }

  delete(id) {
    return http.delete(`/pages/${id}`, { headers: authHeader()});
  }

  deleteAll() {
    return http.delete(`/pages`, { headers: authHeader()});
  }

  findByTitle(title) {
    return http.get(`/pages?title=${title}`, { headers: authHeader()});
  }

  findByTitlePublished(title) {
    return http.get(`/pages/published?title=${title}`);
  }
}

export default new PageDataService();