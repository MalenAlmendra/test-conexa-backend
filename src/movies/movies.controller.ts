import { Body, Controller, ForbiddenException, Get, InternalServerErrorException, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { MovieDTO } from './dto/movie.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {

    constructor( private moviesService:MoviesService ){}

    //TODO: En any va un Movie[]. Movie es el dto
    @Get('/')
    @ApiProperty({description:'This endpoint is for get all movies'})
    async getAllMovies(): Promise<any>{
        try {
            const movieList = await this.moviesService.getAllMovies()
            return movieList
        } catch (error) {
            throw new NotFoundException('movies List not found')
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/details/:idMovie')
    @ApiProperty({description:'This endpoint obtains details about a specific movie'})
    async getMovieDetails(@Request() req, @Param('idMovie') idMovie:string):Promise<any>{

        if(req.user.isAdmin){
            throw new ForbiddenException('No tienes permisos de administrador');
        }
        
        try {
            const movieDetails= await this.moviesService.getMovieDetails(idMovie)
            return movieDetails
        } catch (error) {
            throw new NotFoundException('movie detail not found')
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    @ApiProperty({description:'This endpoint create a movie'})
    async createMovie(@Request() req, @Body() movie:MovieDTO):Promise<any>{
        if(!req.user.isAdmin){
            throw new ForbiddenException('No tienes permisos de administrador');
        }

        try {
            await this.moviesService.createMovie(movie)
            return 'Movie Created'
        } catch (error) {
            throw new InternalServerErrorException('movie can\'t by created')
        }
    } 
}
