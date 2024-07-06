import boto3
import time
import json
from datetime import datetime
import uuid

def lambda_handler(event, context):
    # DynamoDB 리소스 가져오기
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('peerple.question_result_data')
    
    request_body = json.loads(event['body'])
    qna_list = request_body["data"]
    score = {
        "income": 0,
        "vision": 0,
        "relationship": 0,
        "balance": 0,
        "perks": 0
    }
    
    for qna in qna_list:
        for character in score.keys():
            if qna["info"][0] == character[0]:
                score[character] = score[character] + qna["a"]
            elif qna["info"][1] == character[0]:
                score[character] = score[character] + (6 - qna["a"])

    # 현재 시간을 ISO 형식의 문자열로 가져오기
    current_time = datetime.now().isoformat()
    
    # 고유 식별자 생성
    unique_id =  str(uuid.uuid4())
    
    # 삽입할 데이터
    item = {
        'id': unique_id,
        'data': score,
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
        'body': json.dumps(score)
    }