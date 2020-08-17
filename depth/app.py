from chalice import Chalice
from chalicelib import config
from slugify import slugify

app = Chalice(app_name="jasonleo")
app.api.cors = True


@app.route("/blog")
def blog_list():
    table = config.resource.Table("BlogPosts")
    table.reload()
    scanned = table.scan(ConsistentRead=True)
    response = scanned["Items"]
    while "LastEvaluatedKey" in scanned:
        scanned = table.scan(
            ExclusiveStartKey=scanned["LastEvaluatedKey"], ConsistentRead=True
        )
        response.extend(scanned["Items"])
    return response


@app.route("/blog", methods=["POST"])
def create_post():
    title = app.current_request.json_body["title"]
    content = app.current_request.json_body["content"]
    slug = slugify(title)
    table = config.resource.Table("BlogPosts")
    table.put_item(
        Item={"title": title, "slug": slug, "content": content},
        ConditionExpression="attribute_not_exists(slug)",
    )
    table.reload()
