import {IsNumber, IsOptional, IsPositive, Min} from "class-validator";

export class QueryParamsDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number = 20;
    @IsNumber()
    @Min(0)
    @IsOptional()
    offset: number = 0;
}