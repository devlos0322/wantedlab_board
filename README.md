# 댓글이 있는 익명 게시판 구현
댓글이 있는 익명 게시판을 구현한 프로젝트입니다.

## Install
    npm install

## Run
    node app.js

# REST API
게시판 프로젝트의 REST API 예제를 설명합니다.

## 게시글 API
게시글 검색시에는 page, page_size 파라메터가 필수로 입력되어야 합니다. \
예시: GET localhost:8000/v1/post?page=1&page_size=20

### 게시글 목록 검색 성공
#### Requset
    curl -i --location --request GET 'localhost:8000/v1/post?page=1&page_size=2'
#### Response
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 384
    ETag: W/"180-DpvmK9kWUFrgnBqex5IbVcNTQEU"
    Date: Fri, 04 Jun 2021 05:41:22 GMT
    Connection: keep-alive

    [
        {
            "id": 4,
            "title": "test2",
            "content": "help",
            "author": "Jack",
            "password": "test123@",
            "created_at": "2021-06-04 05:40:44",
            "updated_at": "2021-06-04 05:40:44"
        },
        {
            "id": 3,
            "title": "게시글 제목 3",
            "content": "게시글 내용 3 반갑습니다! 새로운 사람입니다.",
            "author": "새로운 사람",
            "password": "test123@",
            "created_at": "2021-06-04 05:40:03",
            "updated_at": "2021-06-04 05:40:03"
        }
    ]
### 게시글 제목을 이용한 검색 성공
게시글 검색시 title 파라메터를 이용합니다. title 키워드가 포함되는 모든 게시글을 검색합니다. 
#### Requset
    curl -i --request GET 'localhost:8000/v1/post?page=1&page_size=2&title=test'
#### Response
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 151
    ETag: W/"97-2y+KRR73lCBLdOM1XDhPFKg4tM4"
    Date: Fri, 04 Jun 2021 05:44:15 GMT
    Connection: keep-alive

    [
        {
            "id": 4,
            "title": "test2",
            "content": "help",
            "author": "Jack",
            "password": "test123@",
            "created_at": "2021-06-04 05:40:44",
            "updated_at": "2021-06-04 05:40:44"
        }
    ]
### 게시글 작성자를 이용한 검색 성공
게시글 검색시 author 파라메터를 이용합니다. author 키워드에 해당하는 모든 게시글을 검색합니다. 
#### Requset
    curl -i --request GET 'localhost:8000/v1/post?page=1&page_size=2&author=Devlos'
#### Response
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 214
    ETag: W/"d6-oXA1JEosVqqX5aWNa6D5kdWJelM"
    Date: Fri, 04 Jun 2021 05:46:01 GMT
    Connection: keep-alive
    
    [
        {
            "id": 1,
            "title": "게시글 제목 1",
            "content": "게시글 내용 1 반갑습니다! Devlos입니다.",
            "author": "Devlos",
            "password": "test123@",
            "created_at": "2021-06-04 05:39:23",
            "updated_at": "2021-06-04 05:39:23"
        }
    ]
### 게시글 검색 실패 (게시글이 존재하지 않음)
조건에 만족하는 검색결과가 없을 경우 다음과 같은 에러를 리턴합니다. 
#### Requset
    curl -i --request GET 'localhost:8000/v1/post?page=1&page_size=2&author=no_one'
#### Response
    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 56
    ETag: W/"38-kz1+vSuQRlH4WUuMqdWB3x7dhbc"
    Date: Fri, 04 Jun 2021 05:47:27 GMT
    Connection: keep-alive

    {
        "message": "Not found posts by author, author: no_one."
    }
### 게시글 작성 성공
#### Requset
    curl -i --request POST 'localhost:8000/v1/post' \ 
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "게시글 제목 4",
        "content": "게시글 내용 4 반갑습니다! 열심히 하겠습니다. Devlos",
        "author": "Devlos",
        "password": "test123@"
    }'
#### Response
    HTTP/1.1 201 Created
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 8
    ETag: W/"8-4U72Xq+/t/P6Xscj7oQblSpGEbo"
    Date: Fri, 04 Jun 2021 05:49:25 GMT
    Connection: keep-alive

    {
        "id":5
    }
### 게시글 수정 성공
#### Requset
    curl -i --request PUT 'localhost:8000/v1/post/5' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "게시글 제목 4",
        "content": "내용을 수정했습니다. 더 열심히 하겠습니다.",
        "author": "Devlos",
        "password": "test123@"
    }'
#### Response
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 10
    ETag: W/"a-rZhHlGvfGNLCQseNFbajZe2GjlA"
    Date: Fri, 04 Jun 2021 05:51:40 GMT
    Connection: keep-alive
    
    {
        "id":"5"
    }
### 게시글 수정 실패 (게시글이 존재하지 않음)
#### Requset
    curl -i --request PUT 'localhost:8000/v1/post/99' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "게시글 제목 4",
        "content": "내용을 수정했습니다. 더 열심히 하겠습니다.",
        "author": "Devlos",
        "password": "test123@"
    }'  
#### Response
    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 43
    ETag: W/"2b-ILWBfX1tQ8moIQkCi0c5RzA62GM"
    Date: Fri, 04 Jun 2021 05:52:24 GMT
    Connection: keep-alive

    {
        "message":"Not found post by id, id: 99."
    }
### 게시글 수정 실패 (게시글 작성시 사용된 비밀번호가 일치하지 않을 때)
#### Requset
    curl -i --request PUT 'localhost:8000/v1/post/4' \ 
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "게시글 제목 4",
        "content": "내용을 수정했습니다. 더 열심히 하겠습니다.",
        "author": "Devlos",
        "password": "wrongPassword"
    }'
#### Response
    HTTP/1.1 401 Unauthorized
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 65
    ETag: W/"41-Fd8jWLJKMqk/zdHU8Yv04adZGkQ"
    Date: Fri, 04 Jun 2021 05:57:07 GMT
    Connection: keep-alive
    
    {
        "message":"Incorrect password, id: 4, password: wrongPassword."
    }
### 게시글 삭제 성공
#### Requset
    curl -i --request DELETE 'localhost:8000/v1/post/5' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "password": "test123@"     
    }'
#### Response
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 10
    ETag: W/"a-rZhHlGvfGNLCQseNFbajZe2GjlA"
    Date: Fri, 04 Jun 2021 05:55:12 GMT
    Connection: keep-alive

    {
        "id":"5"
    }
### 게시글 삭제 실패 (게시글 작성시 사용된 비밀번호가 일치하지 않을 때)
#### Requset
    curl -i --request DELETE 'localhost:8000/v1/post/5' \ 
    --header 'Content-Type: application/json' \    
    --data-raw '{    
        "password": "wrongPassword"  
    }' 
#### Response
    HTTP/1.1 401 Unauthorized
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 65
    ETag: W/"41-AffZ1+l4mmQdDjDhCCG25g6A8YY"
    Date: Fri, 04 Jun 2021 05:54:16 GMT
    Connection: keep-alive
    
    {
        "message":"Incorrect password, id: 5, password: wrongPassword."
    }
## 댓글 API
댓글 검색시에는 post_id(댓글이 작성된 원본 게시글 ID), page, page_size 파라메터가 필수로 입력되어야 합니다. \
예시: GET localhost:8000/v1/post/:post_id/comment?page=1&page_size=20

### 댓글 목록 검색 성공
#### Requset
    curl -i --request GET 'localhost:8000/v1/post/1/comment?page=1&page_size=3'
#### Response
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 345
    ETag: W/"159-IEhRdQRQXBIH+SEZuqbQ6aRe9xY"
    Date: Fri, 04 Jun 2021 06:09:23 GMT
    Connection: keep-alive
[
    {
        "id": 1,
        "comment_content": "반갑습니다",
        "author": "wontedlab",
        "created_at": "2021-06-04 06:00:12",
        "child_comments": [
            {
                "id": 5,
                "comment_content": "어서오세요",
                "author": "leader",
                "created_at": "2021-06-04 06:07:20",
                "parent_id": 1
            },
            {
                "id": 6,
                "comment_content": "어서오세요",
                "author": "leader",
                "created_at": "2021-06-04 06:07:35",
                "parent_id": 1
            }
        ]
    }
]
### 댓글 작성 성공
#### Requset
    curl -i --request POST 'localhost:8000/v1/post/1/comment' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "comment_content": "반갑습니다",
        "author": "wontedlab"
    }'
#### Response
    HTTP/1.1 201 Created
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 8
    ETag: W/"8-h5EdGu1QmHe4OkjsU292jNzSLfE"
    Date: Fri, 04 Jun 2021 06:00:12 GMT
    Connection: keep-alive

    {
        "id":1
    }
### 댓글 작성 실패 (게시글이 존재하지 않을 때)
#### Requset
    curl -i --request POST 'localhost:8000/v1/post/99/comment' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "comment_content": "반갑습니다",
        "author": "wontedlab"
    }'
#### Response
    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 53
    ETag: W/"35-MpgpLOPQnLVv01y1vZMxdIppb6I"
    Date: Fri, 04 Jun 2021 06:01:13 GMT
    Connection: keep-alive

    {
        "message":"Not found post by post id, post id: 99."
    }
### 대댓글 작성 성공
#### Requset
    curl -i --request POST 'localhost:8000/v1/post/1/comment/1' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "comment_content": "어서오세요",
        "author": "leader"   
    }'
#### Response
    HTTP/1.1 201 Created
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 8
    ETag: W/"8-v0WR02X6LTiYi/5IvepyWXxki5M"
    Date: Fri, 04 Jun 2021 06:07:35 GMT
    Connection: keep-alive

    {
        "id":6
    }
### 대댓글 작성 실패 (게시글이 존재하지 않을 때)
#### Requset
    curl -i --request POST 'localhost:8000/v1/post/99/comment/1' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "comment_content": "어서오세요",
        "author": "leader"
    }'
#### Response
    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 44
    ETag: W/"2c-0Z5nGn+0IFStPyUEPpifUkBF4Qs"
    Date: Fri, 04 Jun 2021 06:12:31 GMT
    Connection: keep-alive

    {
        "message":"Not found post id. post id: 99"
    }
### 대댓글 작성 실패 (상위 댓글이 존재하지 않을 때)
#### Requset
    curl -i --request POST 'localhost:8000/v1/post/1/comment/99' \             
    --header 'Content-Type: application/json' \
    --data-raw '{
        "comment_content": "어서오세요",
        "author": "leader"
    }'
#### Response
    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 53
    ETag: W/"35-zj4+z2TTySokaPeJ03aicYhGXmE"
    Date: Fri, 04 Jun 2021 06:09:50 GMT
    Connection: keep-alive

    {
        "message":"Not found parent comment. parent id: 99"
    }