const dummy = (blogs) => {
    return(1)
  }
  

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
      }
      return blogs.length === 0
        ? 0 
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    function compareByLikes(a, b) {
        if (a.likes > b.likes) { return -1; }
        if (a.likes < b.likes) { return 1; }
        return 0;
      }
      
    blogs.sort(compareByLikes);
    return(blogs[0])
}

module.exports = {
    totalLikes,
    dummy,
    favoriteBlog
}