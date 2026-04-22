import {BadRequestException, Injectable} from '@nestjs/common';
import axios, {AxiosInstance} from "axios";
import {PokemonResponseInterface} from "../common/interfaces/pokemonResponse.interface";
import {PokemonService} from "../pokemon/pokemon.service";

@Injectable()
export class SeedService {
    private readonly axios: AxiosInstance = axios;
    constructor(private readonly pokemonService: PokemonService) {}

    async execute() {
        try {
            const {data} = await this.axios.get<PokemonResponseInterface>('https://pokeapi.co/api/v2/pokemon?limit=650')
            data.results.forEach(pokemon => {
                const segments = pokemon.url.split('/');
                const id = +segments[segments.length - 2];
                this.pokemonService.create({name: pokemon.name, id});
            })
            return 'seed executed successfully';
        }catch (e) {
            console.log('Error message: ', e.message);
            throw new BadRequestException('Error executing seed');
        }
    }
}
