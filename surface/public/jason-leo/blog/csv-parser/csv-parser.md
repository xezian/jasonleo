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

This works, but it has limitations. For one thing, look at the block that starts `if (ix === columns.length - 1)`. This part parses the multiple additionally comma seperated values inside the quotation marks at the end. But I can't pass values like that anywhere else. If a description has a comma in it, I have no way of escaping it! These and probably countless other issues make me think I should use an external library for this. Time to do some research...

## Review my options

### [PapaParse](https://www.papaparse.com/)

This one is apparently the most popular so let's have a look.