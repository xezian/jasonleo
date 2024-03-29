# [Jason Leo](https://www.jasonleo.dev)

Hey, hi!

I am Jason Leo, and this is the repository where I am building jasonleo.dev, my new personal website and blog. This will be Serverless via AWS and Netlify. It's basically a Vue app that accesses some resources from an s3 bucket.

Setup locally with `npm install` and run with `npm run dev`

[The `surface` directory](/surface) contains the Vue application.


## Local D with local bucket via localstack

Here's the way my aws credentials file looks:
```
[default]
aws_access_key_id = ...
aws_secret_access_key = ...
[fake]
aws_access_key_id = fakekey
aws_secret_access_key = fakesecret
```
[default] contains personal creds
[fake] contains fake creds (for so as to satisfy localstack)

- Pull the contents of the bucket to locally `aws --profile jason s3 sync s3://jason-leo ./jason-leo`
- Build (if unbuilt) and run the localstack with `docker-compose up -d`
- Create a bucket `aws --profile fake --endpoint-url=http://localhost:4566 s3 mb s3://jason-leo`
- Copy files and make publically readable the bucket `aws --profile fake --endpoint-url=http://localhost:4566 s3 sync ./jason-leo/ s3://jason-leo --acl public-read`
- Set cors-configuration on bucket `aws --endpoint-url=http://localhost:4566 --profile fake s3api put-bucket-cors --bucket jason-leo --cors-configuration file://cors.json`

## Deploy to the real bucket (muchly similar)

- Bucket already exists but make it if it doesn't `aws --profile jason s3 mb s3://jason-leo`
- Sync to it `aws --profile jason s3 sync ./jason-leo/ s3://jason-leo --acl public-read`

Note: bucket is `public-read` so don't put anything sensitive in there!
