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

After reviewing my options, I've decided to use PapaParse. 

### [PapaParse](https://github.com/mholt/PapaParse)

This is definitely the most popular csv parser capable of deciphering csv data client side. At first glance this looks very likely to do the trick here. It seems I can pass in a csv and an optional config argument, and get back a json object. At present, it has 111 contributors, 73 realeases, 9.3 thousand stars on GitHub. Also appears to be capable of reverse parsing, which I will need if I ever want to pull the `/public` folder back into it's own s3 bucket and create the functionality to allow posting from the app. 

1. Install PapaParse: `npm install papaparse`
2. Update parse function to use this Papa
  (This is close, but a couple more steps are needed)
```js
const readInPosts = (postCsv) => {
   return axios
   .get(postCsv)
   .then((response) => {   
      const posts = Papa.parse(response.data, { 
        skipEmptyLines: true, // otherwise the blank line at the end of file counts as a row
        header: true 
      })
      return posts.data
   })
   .catch((err) => {
      console.error(err)
   })
}
```
3. Update the interpretation of the tags field (was an array)
```js
<div
 v-for="tag in listing.tags.split(',')"  // was v-for="tag in listing.tags"
 :key="tag"
 class="tag-badge"
>
 {{ tag }}
</div>
```
4. Order by date
  This wasn't actually happening before, `unshift` was faking it by ordering in reverse. I decided to mutate the array essentially after receiving the response from the `readInPosts()` function.  
```js
this.posts = response.sort(
 (a, b) => new Date(b.date) - new Date(a.date),
)
```
### Nice! 
