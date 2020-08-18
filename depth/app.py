from chalice import Chalice
from chalicelib import config
from slugify import slugify
from requests_toolbelt import MultipartDecoder

app = Chalice(app_name="jasonleo")
app.api.cors = True


def save_file(file):
    # save file to s3
    return "www.url.com"


@app.route("/blog")
def blog_list():
    table = config.resource.Table("BlogPosts")
    scanned = table.scan(ConsistentRead=True)
    print(scanned)
    response = scanned["Items"]
    while "LastEvaluatedKey" in scanned:
        scanned = table.scan(
            ExclusiveStartKey=scanned["LastEvaluatedKey"], ConsistentRead=True
        )
        response.extend(scanned["Items"])
    return response


@app.route("/blog", methods=["POST"], content_types=["multipart/form-data"])
def create_post():
    multipart_data = MultipartDecoder(
        app.current_request.raw_body, app.current_request.headers["content-type"]
    )
    lst = []
    for part in multipart_data.parts:
        disposition = part.headers[b"Content-Disposition"]
        params = {}
        for dispPart in str(disposition).split(";"):
            kv = dispPart.split("=", 2)
            params[str(kv[0]).strip()] = (
                str(kv[1]).strip("\"'\t \r\n") if len(kv) > 1 else str(kv[0]).strip()
            )
        ctype = (
            part.headers[b"Content-Type"] if b"Content-Type" in part.headers else None
        )
        lst.append({"content": part.content, "type": ctype, "params": params})
    save_data = {"title": None, "date": None, "description": None}
    for l in lst:
        if l["params"]["name"] in save_data:
            save_data[l["params"]["name"]] = l["content"]
        elif l["params"]["name"] == "file":
            save_data["url"] = save_file(l)
    save_data["slug"] = slugify(save_data["title"])
    table = config.resource.Table("BlogPosts")
    table.put_item(
        Item={
            "title": save_data["title"],
            "slug": save_data["slug"],
            "description": save_data["description"],
            "date": save_data["date"],
            "url": save_data["url"],
        },
        ConditionExpression="attribute_not_exists(slug)",
    )
