import axios from 'axios';
import { environment } from '../enviroments/enviroments';


export const getPokemons = async () => {
    const resp = await axios({
        method: 'get',
        url: environment.URL_API,
    });
    return resp;
}

export const getInfoPokemons = async (url: any) => {
    const resp = await axios({
        method: 'get',
        url: url,
    });
    return resp;
}