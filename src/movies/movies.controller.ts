import { Body, Controller, Delete, ForbiddenException, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateMovieDTO, MoviesResponseDTO } from './dto/movie.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {

    constructor( private moviesService:MoviesService ){}

    @Get('/')
    @ApiProperty({description:'This endpoint is for get all movies'})
    async getAllMovies(): Promise<MoviesResponseDTO>{
        try {
            return await this.moviesService.getAllMovies()
        } catch (error) {
            throw new NotFoundException('movies List not found')
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/details/:idMovie')
    @ApiProperty({description:'This endpoint obtains details about a specific movie'})
    async getMovieDetails(@Request() req, @Param('idMovie') idMovie:string):Promise<any>{

        if(req.user.isAdmin){
            throw new ForbiddenException('No tienes permisos de usuario');
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
    async createMovie(@Request() req, @Body() movie:CreateMovieDTO):Promise<any>{
        if(!req.user.isAdmin){
            throw new ForbiddenException('No tienes permisos de administrador');
        }

        try {
            return await this.moviesService.createMovie(movie)
        } catch (error) {
            throw new InternalServerErrorException('movie can\'t by created')
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @ApiProperty({description:'This endpoint update information about a movie '})
    @Put('/update')
    async updateMovie(@Request() req, @Body() movieUpdated: UpdateMovieDto):Promise<any>{
        if(!req.user.isAdmin){
            throw new ForbiddenException('No tienes permisos de administrador');
        }

        try {
            return await this.moviesService.updateMovie(movieUpdated)
        } catch (error) {
            throw new InternalServerErrorException('movie can\'t by updated')
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:idMovie')
    async deleteMovie(@Request() req, @Param('idMovie') idMovie:string):Promise<any>{
        if(!req.user.isAdmin){
            throw new ForbiddenException('No tienes permisos de administrador');
        }

        try {
            return await this.moviesService.deleteMovie(idMovie)
        } catch (error) {
            
        }
    }
}
