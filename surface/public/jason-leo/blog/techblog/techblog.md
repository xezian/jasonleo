I read a Twitter post earlier about someone having to debug a homespun csv parser that's just `str.split()` and well. That's something I know I need to work on here. One of the initial things I was advised was like "put it out there, make it work however, whatever means, then go back and refactor". I think it's good advice but we cannot ignore the refactoring bit.

This is not so far a tech blog, but I can't promise it will not include tech content. I want to be able to organize these logically, and this got me thinking.

I will write a blog post about how I take this "personal" blog, and extend it into also a techblog.

These are my first thoughts about it. What I am doing here so far is more like a journal. I have tagged them as personal. So I could tag the others as tech, and allow filtering. Or I could make multiple blogs, using directories, and read them into different pages entirely. But then I cannot tag a post as personal and tech at the same time.

But I like the directories. This blog is set up to post content by syncing a local directory to an s3 bucket in aws. I want to be able to go and alter (and render for local development) from the local version, then on pushing/merging into my main branch, run a pipeline in GitHub that validates and syncs the folder with the s3, and deploys the Vue app via Netlify. It would be nice if things were orgainzed and logical for me when I'm writing for the blog (or updating projects, or about as they work similarly)

I'll have to make a decision, but first things first. Let's outline the things that are needed for this:

[ ] - Organize posts by tags and directories
[ ] - Be able to read from the local directory locally instead of the s3 in aws
[ ] - Implement a more reliable csv parser than the one I made myself with `str.split()`.
