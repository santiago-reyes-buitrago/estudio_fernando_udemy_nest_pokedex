import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePokemonDto} from './dto/create-pokemon.dto';
import {UpdatePokemonDto} from './dto/update-pokemon.dto';
import {isValidObjectId, Model} from "mongoose";
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
            return await this.pokemonModel.create(createPokemonDto);
        } catch (error) {
            return error.message;
        }

    }

    findAll() {
        return this.pokemonModel.find();
    }

    async findOne(id: string) {
        let pokemon;
        if (!isNaN(+id)) {
            pokemon = await this.pokemonModel.findOne({id: +id})
        }

        if (isValidObjectId(id)) {
            pokemon = await this.pokemonModel.findById(id)
        }

        if (!pokemon) throw new NotFoundException(`Pokemon with id ${id} not found`);
        return pokemon;
    }

    update(id: number, updatePokemonDto: UpdatePokemonDto) {
        return `This action updates a #${id} pokemon`;
    }

    remove(id: number) {
        return `This action removes a #${id} pokemon`;
    }
}
