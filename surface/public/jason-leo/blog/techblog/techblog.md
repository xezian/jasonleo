I read a Twitter post earlier about someone having to debug a homespun csv parser that's just `str.split()` and well. That's something I know I need to work on here. One of the initial things I was advised was like "put it out there, make it work however, whatever means, then go back and refactor". I think it's good advice but we cannot ignore the refactoring bit.

This is not so far a tech blog, but I can't promise it will not include tech content. I want to be able to organize these logically, and this got me thinking.

I will write a blog post about how I take this "personal" blog, and extend it into also a techblog.

These are my first thoughts about it. What I am doing here so far is more like a journal. I have tagged them as personal. So I could tag the others as tech, and allow filtering. Or I could make multiple blogs, using directories, and read them into different pages entirely. But then I cannot tag a post as personal and tech at the same time.

But I like the directories. This blog is set up read content from the `public/jason-leo` directory. It would be nice if things were orgainzed and logical for me when I'm writing for the blog (or updating projects, or about as they work similarly)

I'll have to make a decision, but first things first. Let's outline the things that are needed for this:

- Implement a more reliable csv parser than the one I made myself with `str.split()`.
- Organize posts by tags and directories

Here's what the csv parser needs to do. Beginning with a csv file listing my blog posts, like this:

```csv
title,description,date,slug,tags
The Before Time,A blog post about the before time,2020-10-07,the-before-time,"personal"
This Time,A blog post about this time,2020-08-30,this-time,"personal"
Tomorrow,A blog post about tomorrow,2020-11-15,tomorrow,"personal"
We Have to be Patient,Keep focussed on the vision not the means of attainment,2020-11-21,patience,"personal"
Tech Blog,This can also be a tech blog,2020-11-21,techblog,"tech"
```

This function returns an an array `posts` of objects like this one:

```json
{
  "title": "Tech Blog",
  "description": "This can also be a tech blog",
  "date": "2020-11-21",
  "slug": "techblog",
  "tags": ["tech"]
}
```

Let's look at the csv parser I currently have:

```js
const readInPosts = (postCsv) => {
  return axios
    .get(postCsv)
    .then((response) => {
      const lines = response.data.split(/\r\n|\n/)
      const posts = []
      for (let i = 1; i < lines.length; i++) {
        const columns = lines[0].split(",")
        const commaseps = lines[i].split(/,|"/)
        const onePost = Object.fromEntries(
          columns.map((col, ix) => {
            if (ix === columns.length - 1) {
              commaseps[ix] = commaseps.slice(ix + 1, commaseps.length - 1)
            }
            return [col, commaseps[ix]]
          }),
        )
        posts.unshift(onePost)
      }
      return posts
    })
    .catch((err) => {
      console.error(err)
    })
}
```

This works, but it has limitations. For one thing, look at the block that starts `if (ix === columns.length - 1)`. This part parses the multiple additionally comma seperated values inside the quotation marks at the end. But I can't pass values like that anywhere else. If a description has a comma in it, I have no way of escaping it! These and probably countless other issues make me think I should use an external library for this. Time to do some research.
