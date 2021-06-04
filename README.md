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

#### Response

### 게시글 제목을 이용한 검색 성공
게시글 검색시 title 파라메터를 이용합니다. title 키워드가 포함되는 모든 게시글을 검색합니다. 
#### Requset
    
#### Response

### 게시글 작성자를 이용한 검색 (성공)
게시글 검색시 author 파라메터를 이용합니다. author 키워드에 해당하는 모든 게시글을 검색합니다. 
#### Requset

#### Response

### 게시글 검색 실패 (게시글이 존재하지 않음)
조건에 만족하는 검색결과가 없을 경우 다음과 같은 에러를 리턴합니다. 
#### Requset

#### Response


### 게시글 작성 성공
#### Requset

#### Response

### 게시글 수정 성공
#### Requset

#### Response

### 게시글 수정 실패 (게시글이 존재하지 않음)
#### Requset

#### Response

### 게시글 수정 실패 (게시글 작성시 사용된 비밀번호가 일치하지 않을 때)
#### Requset

#### Response

### 게시글 삭제 성공
#### Requset

#### Response

### 게시글 삭제 실패 (게시글 작성시 사용된 비밀번호가 일치하지 않을 때)
#### Requset

#### Response

## 댓글 API
댓글 검색시에는 post_id(댓글이 작성된 원본 게시글 ID), page, page_size 파라메터가 필수로 입력되어야 합니다. \
예시: GET localhost:8000/v1/post/:post_id/comment?page=1&page_size=20

### 댓글 목록 검색 성공
#### Requset

#### Response

### 댓글 작성 성공
#### Requset

#### Response

### 댓글 작성 실패 (게시글이 존재하지 않을 때)
#### Requset

#### Response

### 대댓글 작성 성공
#### Requset

#### Response

### 대댓글 작성 실패 (게시글이 존재하지 않을 때)
#### Requset

#### Response

### 대댓글 작성 실패 (상위 댓글이 존재하지 않을 때)
#### Requset

#### Response