import boto3
import time
import json
from datetime import datetime
import uuid

def lambda_handler(event, context):
    # DynamoDB 리소스 가져오기
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('peerple.advance_application_data')
    
    request_body = json.loads(event['body'])
    email = request_body["data"]
    
    # 고유 식별자 생성
    unique_id =  str(uuid.uuid4())
    
    # 현재 시간을 ISO 형식의 문자열로 가져오기
    current_time = datetime.now().isoformat()

    # 삽입할 데이터
    item = {
        'id': unique_id,
        'email': email,
        'timestamp': current_time
    }
    
    # 데이터 삽입
    response = table.put_item(Item=item)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': json.dumps(item)
    }