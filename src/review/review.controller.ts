import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CustomResponseDto } from "../database/dto/custom-response.dto";

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('game/:slug')
  async findAllGameReviews(
    @Param('slug') slug: string,
    @Query('username') username: string,
    @Query('sort-option') sortOption: string,
  ): Promise<any> {

    return await this.reviewService.findAllGameReviews(slug, username, sortOption);
  };

  @Get(':username')
  async findAllUserReviews(
    @Param('username') username: string,
    @Query('viewer') viewer: string,
    @Query('sort-option') sortOption: string,
  ): Promise<any> {

    return await this.reviewService.findAllUserReviews(username, viewer, sortOption);
  };

  @Post(':username/:slug')
  async create(
    @Param('username') username: string,
    @Param('slug') slug: string,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<CustomResponseDto> {

    return await this.reviewService.create(username, slug, createReviewDto);
  };

  @Delete(':id')
  async remove(@Param('id') reviewId: number): Promise<CustomResponseDto> {

    return await this.reviewService.remove(reviewId);
  };

  @Patch('id')
  async update(
    @Param('id') reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<CustomResponseDto> {

    return await this.reviewService.update(reviewId, updateReviewDto);
  };

  @Patch('/like/:id/:username')
  async like(
    @Param('id') reviewId: number,
    @Param('username') username: string,
  ): Promise<CustomResponseDto> {

    return await this.reviewService.like(reviewId, username);
  };

  @Patch('/dislike/:id/:username')
  async dislike(
    @Param('id') reviewId: number,
    @Param('username') username: string,
  ): Promise<CustomResponseDto> {

    return await this.reviewService.dislike(reviewId, username);
  };

  @Patch('un/like/:id/:username')
  async unLike(
    @Param('id') reviewId: number,
    @Param('username') username: string,
  ): Promise<CustomResponseDto> {

    return await this.reviewService.unLike(reviewId, username);
  };

  @Patch('un/dislike/:id/:username')
  async unDislike(
    @Param('id') reviewId: number,
    @Param('username') username: string,
  ): Promise<CustomResponseDto> {

    return await this.reviewService.unDislike(reviewId, username);
  };
}
