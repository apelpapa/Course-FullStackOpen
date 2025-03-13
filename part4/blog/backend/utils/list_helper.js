const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs && blogs.length > 0) {
    return blogs.reduce((maxSoFar, current) => {
      return current.likes > maxSoFar.likes ? current : maxSoFar;
    });
  } else {
    return [];
  }
};



const mostBlogs = (blogs) => {
    if(!blogs || blogs.length === 0){
        return []
    }
  const authors = blogs.map((blog) => {
    return { author: blog.author, blogs: 1 };
  });
  authors.sort((a, b) => {
    if (a.author < b.author) {
      return -1;
    }
    if (a.author > b.author) {
      return 1;
    }
    return 0;
  });

  for (i = 0; i < authors.length; i++) {
    if (authors[i + 1]) {
      while (authors[i + 1] && authors[i].author === authors[i + 1].author) {
        authors[i].blogs++;
        authors.splice(i + 1, 1);
      }
    }
  }

  return authors.reduce((maxSoFar, current) => {
    return current.blogs > maxSoFar.blogs ? current : maxSoFar;
  });
};

const mostLikes = (blogs) => {
    if(!blogs || blogs.length === 0){
        return []
    }
    const likesByAuthor = blogs.reduce((acc, blog) =>{
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc;
    },{})

    const authorTotalLikes = Object.entries(likesByAuthor).map(([author, likes])=> ({author, likes}))

    return authorTotalLikes.reduce((maxSoFar, current) => {
        return current.likes > maxSoFar.likes ? current : maxSoFar;
      });
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
