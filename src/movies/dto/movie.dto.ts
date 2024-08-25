import { IsArray, IsNumber, IsString } from "class-validator";


export class MovieDTO {
    @IsString()
    title:         string;

    @IsNumber()
    episode_id:    number;

    @IsString()
    opening_crawl: string;

    @IsString()
    director:      string;

    @IsString()
    producer:      string;

    @IsString()
    release_date:  string;

    @IsArray()
    characters:    string[];

    @IsArray()
    planets:       string[];

    @IsArray()
    starships:     string[];

    @IsArray()
    vehicles:      string[];

    @IsArray()
    species:       string[];

    @IsString()
    created:       string;

    @IsString()
    edited:        string;

    @IsString()
    url:           string;
}
