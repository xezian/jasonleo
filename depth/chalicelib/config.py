import boto3
import os

if os.environ["CHALICE_ENV"] == "local":
    dynamodb = boto3.client(
        "dynamodb",
        endpoint_url="http://localhost:7777",
        region_name="dummy_region",
        aws_access_key_id="dummy_access_key",
        aws_secret_access_key="dummy_secret_key",
        verify=False,
    )
    resource = boto3.resource(
        "dynamodb",
        endpoint_url="http://localhost:7777",
        region_name="dummy_region",
        aws_access_key_id="dummy_access_key",
        aws_secret_access_key="dummy_secret_key",
        verify=False,
    )
else:
    dynamodb = boto3.client("dynamodb")
    resource = boto3.resource("dynamodb")

