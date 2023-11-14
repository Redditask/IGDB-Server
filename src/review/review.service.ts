import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Sorts } from "../common/utils/sorts";
import { CustomResponseDto } from "../database/dto/custom-response.dto";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllGameReviews(slug: string, username: string, sortOption: string): Promise<any> {

    const reviews: Review [] = await this.reviewRepository.find({
      where: {
        slug
      },
    });

    let userReviewId: number = 0;
    let allRatings: number = 0;
    let newUserReview;
    let newReviews: any [] = [];

    reviews.forEach((review: Review): void => {
      allRatings += review.rating;
    });

    const medianRating: number = allRatings/reviews.length;

    let userReview: Review = reviews.find(
      (review: Review): boolean => review.user.username === username
    );

    const otherReviews: Review [] = reviews.filter(
      (review: Review): boolean => review.user.username !== username
    );

    if (userReview) {
      newUserReview = {
        ...userReview,
        likedUsers: userReview.likedUsers.length,
        dislikedUsers: userReview.dislikedUsers.length,
        userReaction: "null",
      };

      userReviewId = userReview.id;
    }

    for (let review of otherReviews as Review []) {
      if (review.likedUsers.includes(username)) {
        newReviews.push({
          ...review,
          likedUsers: review.likedUsers.length,
          dislikedUsers: review.dislikedUsers.length,
          userReaction: "like",
        });
      } else if (review.dislikedUsers.includes(username)) {
        newReviews.push({
          ...review,
          likedUsers: review.likedUsers.length,
          dislikedUsers: review.dislikedUsers.length,
          userReaction: "dislike",
        });
      } else {
        newReviews.push({
          ...review,
          likedUsers: review.likedUsers.length,
          dislikedUsers: review.dislikedUsers.length,
          userReaction: "null",
        });
      }
    }

    if (sortOption === "mostLiked") {
      newReviews.sort(Sorts.mostLikedSort);
    } else if (sortOption === "latest") {
      newReviews.sort(Sorts.latestSort);
    } else if (sortOption === "ascendingRating") {
      newReviews.sort(Sorts.ascendingRatingSort);
    } else newReviews.sort(Sorts.descendingRatingSort);

    return userReview
      ? {reviews: [newUserReview, ...newReviews], userReviewId, medianRating: medianRating.toFixed(2)}
      : {reviews: newReviews, userReviewId, medianRating: medianRating.toFixed(2)};
  };

  async findAllUserReviews(username: string, viewer: string, sortOption: string): Promise<any> {

    const reviews: Review [] = await this.reviewRepository.find({
      where: {
        user: {
          username: username,
        },
      },
    });

    let allRatings: number = 0;
    let newReviews: any [] = [];

    reviews.forEach((review: Review): void => {
      allRatings += review.rating;
    });

    const medianRating: number = allRatings/reviews.length;

    for (let review of reviews as Review []) {
      if (review.likedUsers.includes(viewer)) {
        newReviews.push({
          ...review,
          likedUsers: review.likedUsers.length,
          dislikedUsers: review.dislikedUsers.length,
          userReaction: "like",
        });
      } else if (review.dislikedUsers.includes(viewer)) {
        newReviews.push({
          ...review,
          likedUsers: review.likedUsers.length,
          dislikedUsers: review.dislikedUsers.length,
          userReaction: "dislike",
        });
      } else {
        newReviews.push({
          ...review,
          likedUsers: review.likedUsers.length,
          dislikedUsers: review.dislikedUsers.length,
          userReaction: "null",
        });
      }
    }

    if (sortOption === "mostLiked") {
      newReviews.sort(Sorts.mostLikedSort);
    } else if (sortOption === "latest") {
      newReviews.sort(Sorts.latestSort);
    } else if (sortOption === "ascendingRating") {
      newReviews.sort(Sorts.ascendingRatingSort);
    } else newReviews.sort(Sorts.descendingRatingSort);

    return {reviews: newReviews, medianRating: medianRating.toFixed(2)};
  };

  async create(username: string, slug: string, createReviewDto: CreateReviewDto): Promise<CustomResponseDto>{

    const user: User = await this.userRepository.findOne({
      where: {
       username: username,
      },
    });

    const review: Review = new Review({
      user,
      slug,
      ...createReviewDto
    });

    await this.reviewRepository.save(review);

    return new CustomResponseDto(200, 'Review was successful added');
  };

  async remove(reviewId: number): Promise<CustomResponseDto> {

    await this.reviewRepository.delete({
      id: reviewId,
    });

    return new CustomResponseDto(200, 'Review was successful removed');
  };

  async update(reviewId: number, updateReviewDto: UpdateReviewDto): Promise<CustomResponseDto> {

    await this.reviewRepository.save({
      id: reviewId,
      text: updateReviewDto.text,
      rating: updateReviewDto.rating,
    });

    return new CustomResponseDto(200, 'Review was successful updated');
  };

  async like(reviewId: number, username: string): Promise<CustomResponseDto> {

    const review: Review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
    });

    await this.reviewRepository.save({
      ...review,
      likedUsers: [...review.likedUsers, username],
    });

    return new CustomResponseDto(200, 'Review was successful updated');
  };

  async dislike(reviewId: number, username: string): Promise<CustomResponseDto> {

    const review: Review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
    });

    await this.reviewRepository.save({
      ...review,
      dislikedUsers: [...review.dislikedUsers, username],
    });

    return new CustomResponseDto(200, 'Review was successful updated');
  };

  async unLike(reviewId: number, username: string): Promise<CustomResponseDto> {

    const review: Review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
    });

    const updatedLikedUsers: string [] = review.likedUsers.filter((
      likedUser: string): boolean => likedUser !== username
    );

    await this.reviewRepository.save({
      ...review,
      likedUsers: [...updatedLikedUsers],
    });

    return new CustomResponseDto(200, 'Review was successful updated');
  };

  async unDislike(reviewId: number, username: string): Promise<CustomResponseDto> {

    const review: Review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
    });

    const updatedDislikedUsers: string [] = review.dislikedUsers.filter(
      (dislikedUser: string): boolean => dislikedUser !== username,
    );

    await this.reviewRepository.save({
      ...review,
      dislikedUsers: [...updatedDislikedUsers],
    });

    return new CustomResponseDto(200, 'Review was successful updated');
  };
}
