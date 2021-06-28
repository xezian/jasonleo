import axios from "axios"
import Papa from "papaparse"

const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4566"
    : "https://jason-leo.s3.us-west-1.amazonaws.com"

const storage = {
  getBlogPosts: async () => {
    const posts = await readContentsCsv("/jason-leo/blog/index.csv")
    return [null, posts]
  },
  getOnePost: async (slug) => {
    const posts = await getThePost(`/jason-leo/blog/${slug}/${slug}.md`)
    return [null, posts]
  },
  getProjects: async () => {
    const posts = await readContentsCsv("/jason-leo/projects/index.csv")
    return [null, posts]
  },
  getOneProject: async (slug) => {
    const posts = await getThePost(`/jason-leo/projects/${slug}.md`)
    return [null, posts]
  },
  axios,
}

const getThePost = (postMd) => {
  return axios
    .get(baseUrl + postMd)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.error(err)
    })
}

const readContentsCsv = (postCsv) => {
  return axios
    .get(baseUrl + postCsv)
    .then((response) => {
      const posts = Papa.parse(response.data, {
        skipEmptyLines: true,
        header: true,
      })
      return posts.data
    })
    .catch((err) => {
      console.error(err)
    })
}

export default storage
