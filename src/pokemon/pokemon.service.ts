import {Injectable} from '@nestjs/common';
import {CreatePokemonDto} from './dto/create-pokemon.dto';
import {UpdatePokemonDto} from './dto/update-pokemon.dto';
import {Model} from "mongoose";
import {Pokemon} from "./entities/pokemon.entity";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class PokemonService {
    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>
    ) {
    }

    async create(createPokemonDto: CreatePokemonDto) {
        try {
            const pokemon = await this.pokemonModel.create(createPokemonDto);
            return pokemon;
        } catch (error) {
            console.log(error);
            return error.message;
        }

    }

    findAll() {
        return this.pokemonModel.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} pokemon`;
    }

    update(id: number, updatePokemonDto: UpdatePokemonDto) {
        return `This action updates a #${id} pokemon`;
    }

    remove(id: number) {
        return `This action removes a #${id} pokemon`;
    }
}
