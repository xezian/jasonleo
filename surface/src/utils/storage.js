import axios from "axios"
import { Storage } from "aws-amplify"

let storage

if (process.env.VUE_APP_CONNECT_TO_AWS === "no") {
  storage = {
    getBlogPosts: async () => {
      const data = await readInPosts("/test/blog/index.csv")
      return [null, data]
    },
    getOnePost: async (slug) => {
      const data = await getThePost(`/test/blog/${slug}.md`)
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
    getOnePost: (slug) => {
      return Storage.get(`${slug}/${slug}.md`, {
        customPrefix: { public: "blog/" },
      })
        .then(async (response) => {
          const data = await getThePost(response)
          return [null, data]
        })
        .catch((err) => {
          console.error(err)
          return [err, null]
        })
    },
    postToBlog: (postData) => {
      console.log(postData)
    },
    getProjects: () => {
      return Storage.get("index.csv", { customPrefix: { public: "projects/" } })
        .then(async (response) => {
          const posts = await readInPosts(response)
          console.log(posts)
          return [null, posts]
        })
        .catch((err) => {
          console.error(err)
          return [err, null]
        })
    },
    getOneProject: (slug) => {
      return Storage.get(`${slug}.md`, {
        customPrefix: { public: "projects/" },
      })
        .then(async (response) => {
          const data = await getThePost(response)
          return [null, data]
        })
        .catch((err) => {
          console.error(err)
          return [err, null]
        })
    },
  }
}

const getThePost = (postMd) => {
  return axios
    .get(postMd)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.error(err)
    })
}

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
              commaseps[ix] = commaseps
                .slice(ix + 1, commaseps.length - 1)
                .join()
            }
            return [col, commaseps[ix]]
          }),
        )
        posts.push(onePost)
      }
      return posts
    })
    .catch((err) => {
      console.error(err)
    })
}

export default storage
