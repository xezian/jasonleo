import axios from "axios"

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

export default storage
