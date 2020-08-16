from chalicelib.config import dynamodb


def make_table(name, key_schema, attribute_defs):
    dynamodb.create_table(
        TableName=name,
        KeySchema=key_schema,
        AttributeDefinitions=attribute_defs,
        BillingMode="PAY_PER_REQUEST",
    )


tables = dynamodb.list_tables()
table_names = set(["BlogPosts", "Projects", "People"])
createds = set()
for table in tables["TableNames"]:
    if table in table_names:
        createds.add(table)
    else:
        dynamodb.delete_table(TableName=table)

key_schema = [
    {"AttributeName": "slug", "KeyType": "HASH"},
    {"AttributeName": "title", "KeyType": "RANGE"},
]

attribute_defs = [
    {"AttributeName": "slug", "AttributeType": "S"},
    {"AttributeName": "title", "AttributeType": "S"},
]

if len(createds):
    print("Already: ")
    print(createds)
    print("To be Created: ")
    print(table_names - createds)

if "BlogPosts" not in createds:
    make_table(
        "BlogPosts", key_schema, attribute_defs,
    )
if "Projects" not in createds:
    make_table(
        "Projects", key_schema, attribute_defs,
    )
if "People" not in createds:
    people_schema = [{"AttributeName": "email", "KeyType": "HASH"}]
    people_defs = [{"AttributeName": "email", "AttributeType": "S"}]
    make_table(
        "People", people_schema, people_defs,
    )
