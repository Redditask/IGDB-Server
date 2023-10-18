const mostLikedSort = (review1, review2) => {
    if (review1.likedUsers > review2.likedUsers) {
        return -1;
    }

    if (review1.likedUsers < review2.likedUsers) {
        return 1;
    }

    return 0;
};

const latestSort = (review1, review2) => {
    const reviewDate1 = new Date(review1.createdAt);
    const reviewDate2 = new Date(review2.createdAt);

    return reviewDate2 - reviewDate1;
};

const ascendingRatingSort = (review1, review2) => {
  return review1.rating - review2.rating;
};

const descendingRatingSort = (review1, review2) => {
    return review2.rating - review1.rating;
};

module.exports = {
    mostLikedSort,
    latestSort,
    ascendingRatingSort,
    descendingRatingSort
};
