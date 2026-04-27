import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePokemonDto} from './dto/create-pokemon.dto';
import {UpdatePokemonDto} from './dto/update-pokemon.dto';
import {isValidObjectId, Model} from "mongoose";
import {Pokemon} from "./entities/pokemon.entity";
import {InjectModel} from "@nestjs/mongoose";
import {QueryParamsDto} from "../common/dto/query-params.dto";

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

    findAll(queryParam: QueryParamsDto) {
        return this.pokemonModel.find().limit(queryParam.limit).skip(queryParam.offset);
    }

    async findOne(id: string): Promise<Pokemon> {
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

    async update(id: string, updatePokemonDto: UpdatePokemonDto) {
        const pokemon = await this.findOne(id);
        if (updatePokemonDto.name){
            updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
        }
        await pokemon.updateOne(updatePokemonDto,{new: true});
        return pokemon;
    }

    bulkInsert(createPokemonDto: CreatePokemonDto[]){
        if (createPokemonDto.length === 0) return;
        return this.pokemonModel.insertMany(createPokemonDto);
    }

    async remove(id: string) {
        // return this.pokemonModel.findOneAndDelete(id);
        const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
        if (!deletedCount){
            throw new NotFoundException(`Pokemon with id ${id} not found`);
        }
        return deletedCount;
    }
}
