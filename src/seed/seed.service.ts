import {BadRequestException, Injectable} from '@nestjs/common';
import axios, {AxiosInstance} from "axios";
import {PokemonResponseInterface} from "../common/interfaces/pokemonResponse.interface";
import {PokemonService} from "../pokemon/pokemon.service";
import {AxiosAdapter} from "../common/adapters/axios.adapter";

@Injectable()
export class SeedService {
    constructor(
        private readonly pokemonService: PokemonService,
        private readonly axiosAdapter: AxiosAdapter
    ) {
    }

    async execute() {
        try {
            const data = await this.axiosAdapter.get<PokemonResponseInterface>('https://pokeapi.co/api/v2/pokemon?limit=650')
            // uno a uno
            // for (const pokemon of data.results) {
            //     const segments = pokemon.url.split('/');
            //     const id = +segments[segments.length - 2];
            //     await this.pokemonService.create({name: pokemon.name, id});
            // }

            // multiples insercciones
            // const bulkInsertData: Promise<any>[] = [];
            // for (const pokemon of data.results) {
            //     const segments = pokemon.url.split('/');
            //     const id = +segments[segments.length - 2];
            //     bulkInsertData.push(this.pokemonService.create({name: pokemon.name, id}));
            // }
            // await Promise.all(bulkInsertData);
            // Bulkinsert con ODM
            const pokemonToInsert: { name: string, id: number }[] = []
            for (const pokemon of data.results) {
                const segments = pokemon.url.split('/');
                const id = +segments[segments.length - 2];
                pokemonToInsert.push({name: pokemon.name, id});
            }
            await this.pokemonService.bulkInsert(pokemonToInsert);
            return 'seed executed successfully';
        } catch (e) {
            console.log('Error message: ', e.message);
            throw new BadRequestException('Error executing seed');
        }
    }
}
