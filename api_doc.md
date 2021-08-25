# Fishy Chat App Server
Fishy Chat App is an application for people to chat about their topic of choices.
This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response



## RESTful endpoints for /news
### POST /register

> Register

_Request Header_
```
  not needed
```

_Request Body_
```
  email: <string in email format>,
  username: <string>,
  password: <string>
```

_Response (201)_
```
{
  "id": 2,
  "username": "macaco"
}
```
_Response (500 - Internal server error)_
```
  Internal server error
```
### POST /login
> Login
_Request Header_
```
    not needed
```

_Request Body_
```
	username : <String>,
	password : <String>
```

_Response (200)_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoyLCJ1c2VybmFtZSI6Im1hY2FjbyJ9LCJpYXQiOjE2Mjk5MDYzMzR9.dLxUpZLpBfk0RoFfeAPi4TxfaJsVuCKCvivSWHxi9qY"
}

```
_Response (500 - Internal server error)_
```
  Internal server error
```
---
### GET /getrooms
> Get available rooms for chatting
_Request Header_
```
    not needed
```

_Request Body_
```
	not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "name": "Anime",
    "description": "You smell like garlic but that's okay, you're not alone! Enter this chat room and meet other people who also smell like garlic!",
    "url": "https://garryfishy.daily.co/Anime",
    "imgUrl": "https://cdn.idntimes.com/content-images/community/2020/09/9a2ca8003fc55c92ed1245c8dba8cf2460bcaf46-copy-616x347-f1141fda1a7411e87c8978bfcfdab6f9_600x400.jpg"
  },
  {
    "id": 3,
    "name": "Games",
    "description": "Tired of playing video games all day? Good! Enter this room and share about your gaming experience, find new gaming buddies!",
    "url": "https://garryfishy.daily.co/Games",
    "imgUrl": "https://gamingbolt.com/wp-content/uploads/2019/07/kingdom-hearts-3.jpg"
  },
  {
    "id": 2,
    "name": "TV-Show",
    "description": "Kids, let me tell you a story about my favorite TV Show.",
    "url": "https://garryfishy.daily.co/TV-show",
    "imgUrl": "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/haifoto/original/26116_siap-siap-tonton-istri-ted-di-musim-final-how-i-met-your-mother.jpg"
  }
]
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
---
### POST /videoRoom
> Add a new chat room for users to enjoy.
_Request Header_
```
    "access_token": "<your access token>"
```

_Request Body_
```
    not needed
```

_Response (201)_
```
{
  "id": 38,
  "name": "test",
  "description": "opo",
  "url": "https://garryfishy.daily.co/a4aMCcKrOCMjBQi0w73R",
  "imgUrl": "https://ik.imagekit.io/waknkqe0dx5v/17_tUAqlK60M.jpeg",
  "updatedAt": "2021-08-25T15:47:02.325Z",
  "createdAt": "2021-08-25T15:47:02.325Z"
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
### GET /translated/:id
> Find translations saved by each users

_Request Params_
```
{
	id: <taken from req.user>
}
```
_Request Header_
```
{
  access_token: <your access token>
}
```

_Request Body_
```
<not needed>
```

_Response (200)_
```
[
  {
    "id": 1,
    "from": "Morning,(en)",
    "to": "Pagi,(id)",
    "createdAt": "2021-08-25T15:48:17.442Z",
    "updatedAt": "2021-08-25T15:48:17.442Z",
    "UserId": 1,
    "User": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "password": "$2b$10$Xp0229ThAvSzbO3CqWJBIeP0TW/p26gsjVpXXkym3letAaP8.yEjG",
      "createdAt": "2021-08-25T14:30:43.285Z",
      "updatedAt": "2021-08-25T14:30:43.285Z"
    }
  }
]
```


_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
### POST /translated/
> Add a new translation.
_Request Header_
```
{
  "access_token" : "<your access token>"
}
```

_Request Body_
```
{
  to: <string>
  from: <string>
}
```

_Response (201 - Created)_
```
{
  "to": "Morning",
  "from": "Pagi",
  "UserId": 2
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
### DELETE /translated/:id
> Delete translation from database

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
  no needed
```

_Response (200 - Ok!)_
```
{
  'Deleted'
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
