import axios from "axios"
import { Storage } from "aws-amplify"

let storage

if (process.env.NODE_ENV === "development") {
  storage = {
    getBlogPosts: async () => {
      const data = await readInPosts("/test/index.csv")
      return [null, data]
    },
  }
} else {
  storage = {
    getBlogPosts: () => {
      return Storage.get("index.csv", { customPrefix: { public: "blog/" } })
        .then(async (response) => {
          const posts = await readInPosts(response)
          return [null, posts]
        })
        .catch((err) => {
          console.error(err)
          return [err, null]
        })
    },
  }
}

const readInPosts = (postCsv) => {
  return axios
    .get(postCsv)
    .then((response) => {
      const lines = response.data.split(/\r\n|\n/)
      const posts = []
      for (let i = 1; i < lines.length; i++) {
        const commaseps = lines[i].split(/,|"/)
        posts.push({
          title: commaseps[0],
          description: commaseps[1],
          date: commaseps[2],
          slug: commaseps[3],
          tags: commaseps.slice(5, commaseps.length - 1).join(),
        })
      }
      return posts
    })
    .catch((err) => {
      console.error(err)
    })
}

export default storage
