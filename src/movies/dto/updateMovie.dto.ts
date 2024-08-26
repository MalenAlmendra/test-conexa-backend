import { PartialType } from "@nestjs/swagger";
import { CreateMovieDTO } from "./movie.dto";
import { IsString } from "class-validator";

export class UpdateMovieDto extends PartialType(CreateMovieDTO) {
    @IsString()
    idMovie:string;
}