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

module.exports = {
    mostLikedSort,
    latestSort
};
