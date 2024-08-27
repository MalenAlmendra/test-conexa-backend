import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import {  ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateMovieDTO, MoviesResponseDTO, Result } from './dto/movie.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('/')
  @ApiOperation({ summary: 'This endpoint is for get all movies' })
  @ApiProperty()
  @ApiOkResponse({type:()=>MoviesController})
  @ApiNotFoundResponse({description:'Movies List not found'})
  async getAllMovies(): Promise<MoviesResponseDTO> {
    try {
      return await this.moviesService.getAllMovies();
    } catch (error) {
      throw new NotFoundException('Movies List not found');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/details/:idMovie')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'This endpoint obtains details about a specific movie' })
  @ApiProperty({type:()=>Result})
  
  @ApiForbiddenResponse({description:"You don\'t have user permissions"})
  async getMovieDetails(
    @Request() req,
    @Param('idMovie') idMovie: string,
  ): Promise<Result> {
    if (req.user.isAdmin) {
      throw new ForbiddenException('You don\'t have user permissions');
    }

    try {
      const movieDetails = await this.moviesService.getMovieDetails(idMovie);
      return movieDetails;
    } catch (error) {
      throw new NotFoundException('movie detail not found');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'This endpoint create a movie' })
  @ApiProperty()
  @ApiOkResponse({description:"Movie Created"})
  @ApiForbiddenResponse({description:"You don\'t have administrator permissions"})
  @ApiBadRequestResponse({description:"Movie can't by created"})
  async createMovie(
    @Request() req,
    @Body() movie: CreateMovieDTO,
  ): Promise<string> {
    if (!req.user.isAdmin) {
      throw new ForbiddenException('You don\'t have administrator permissions');
    }

    try {
      return await this.moviesService.createMovie(movie);
    } catch (error) {
      throw new BadRequestException("Movie can't by created");
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'This endpoint update information about a movie' })
  @ApiProperty()
  @ApiOkResponse({description:"Movie Updated"})
  @ApiForbiddenResponse({description:"You don\'t have administrator permissions"})
  @ApiBadRequestResponse({description:"Movie can't by updated"})
  async updateMovie(
    @Request() req,
    @Body() movieUpdated: UpdateMovieDto,
  ): Promise<any> {
    if (!req.user.isAdmin) {
      throw new ForbiddenException('You don\'t have administrator permissions');
    }

    try {
      return await this.moviesService.updateMovie(movieUpdated);
    } catch (error) {
      throw new BadRequestException("Movie can't by updated");
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:idMovie')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'This endpoint delete a movie' })
  @ApiProperty()
  @ApiOkResponse({description:"Movie Deleted"})
  @ApiForbiddenResponse({description:"You don\'t have administrator permissions"})
  @ApiBadRequestResponse({description:"Movie can't by deleted"})
  async deleteMovie(
    @Request() req,
    @Param('idMovie') idMovie: string,
  ): Promise<any> {
    if (!req.user.isAdmin) {
      throw new ForbiddenException('You don\'t have administrator permissions');
    }

    try {
      return await this.moviesService.deleteMovie(idMovie);
    } catch (error) {
      throw new BadRequestException("Movie can't by deleted")
    }
  }
}
