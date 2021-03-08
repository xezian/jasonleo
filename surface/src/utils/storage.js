import axios from "axios"
import Papa from "papaparse"

const storage = {
  getBlogPosts: async () => {
    const posts = await readInPosts("/jason-leo/blog/index.csv")
    return [null, posts]
  },
  getOnePost: async (slug) => {
    const posts = await getThePost(`/jason-leo/blog/${slug}/${slug}.md`)
    return [null, posts]
  },
  getProjects: async () => {
    const posts = await readInPosts("/jason-leo/projects/index.csv")
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
      const posts = Papa.parse(response.data, {
        skipEmptyLines: true,
        header: true,
      })
      console.log(posts.data)
      return posts.data
    })
    .catch((err) => {
      console.error(err)
    })
}

export default storage
