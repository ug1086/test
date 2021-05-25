import http from "../http-common";

class PokemonDataService {
    getAll(limit, offset){
        return http.get(`?limit=${limit}&offset=${offset}`);
    }
} 

export default new PokemonDataService();