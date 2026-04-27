import {Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import {ParseMongoIdPipe} from "../common/pipes/parse-mongo-id.pipe";
import {QueryParamsDto} from "../common/dto/query-params.dto";

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {
  }

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() query: QueryParamsDto) {
    return this.pokemonService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
