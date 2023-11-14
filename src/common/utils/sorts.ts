import { Review } from "../../review/entities/review.entity";

export class Sorts {

  public static mostLikedSort = (review1: Review, review2: Review): number => {
    if (review1.likedUsers > review2.likedUsers) {
      return -1;
    }

    if (review1.likedUsers < review2.likedUsers) {
      return 1;
    }

    return 0;
  };

public static latestSort = (review1: Review, review2: Review) => {
  const reviewDate1: Date = new Date(review1.createdAt);
  const reviewDate2: Date = new Date(review2.createdAt);

  return ((reviewDate2 as any) - (reviewDate1 as any));
};

  public static ascendingRatingSort = (review1: Review, review2: Review): number => {
    return review1.rating - review2.rating;
  };

  public static descendingRatingSort = (review1: Review, review2: Review): number => {
    return review2.rating - review1.rating;
  };
}
