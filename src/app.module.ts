import {Module} from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {PokemonModule} from './pokemon/pokemon.module';
import {MongooseModule} from "@nestjs/mongoose";
import {CommonModule} from './common/common.module';
import {SeedModule} from './seed/seed.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {EnvConfig} from "./config/env.config";
import {envValidation} from "./config/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: envValidation
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUrl'),
      }),
    }),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
})
export class AppModule {
  constructor() {
    console.log(process.env);
  }
}
