from chalice import Chalice
from chalicelib import config

app = Chalice(app_name="jasonleo")


@app.route("/blog")
def blog_list():
    blog_table = config.dynamodb.Table("BlogPosts")
    print(blog_table.scan())


@app.route("/blog", methods=["POST"])
def create_post():
    body = app.current_request.json_body
    print(body)
