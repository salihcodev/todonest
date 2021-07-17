## Description

Simple todo list application built with [**Nest**](https://github.com/nestjs/nest) framework, With fully CRUD operation features, Auth and logging system feature implemented as well!

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## File Structure

```bash
root
├── config
│   ├── default.yml
│   ├── development.yml
│   └── production.yml
├── nest-cli.json
├── package.json
├── README.md
├── src
│   ├── common
│   │   ├── auth-strategies
│   │   │   └── jwt-auth.strategy.ts
│   │   ├── constants
│   │   │   └── psql
│   │   │       └── error-codes.constants.ts
│   │   ├── decorators
│   │   │   └── getUser.decorator.ts
│   │   ├── dtos
│   │   │   ├── todo
│   │   │   │   ├── create-todo.dto.ts
│   │   │   │   └── filter-todo.dto.ts
│   │   │   └── user
│   │   │       ├── user-signin.dto.ts
│   │   │       └── user-signup.dto.ts
│   │   ├── entities
│   │   │   ├── todo
│   │   │   │   └── todo.entity.ts
│   │   │   └── user
│   │   │       └── user.entity.ts
│   │   ├── enums
│   │   │   └── todo-status.enum.ts
│   │   ├── interfaces
│   │   │   └── auth
│   │   │       └── jwt-payload.interface.ts
│   │   └── pipes
│   │       └── todo
│   │           └── todo-status.pipe.ts
│   ├── configs
│   │   └── typeORM.config.ts
│   ├── controllers
│   │   ├── auth
│   │   │   └── auth.controller.ts
│   │   └── todo
│   │       └── todo.controller.ts
│   ├── main.ts
│   ├── modules
│   │   ├── app
│   │   │   └── app.module.ts
│   │   ├── auth
│   │   │   └── auth.module.ts
│   │   └── todo
│   │       └── todo.module.ts
│   ├── repositories
│   │   ├── todo
│   │   │   └── todo.repository.ts
│   │   └── user
│   │       └── user.repository.ts
│   └── services
│       ├── auth
│       │   └── auth.service.ts
│       └── todo
│           └── todo.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

## How to use

## Available APIs (end-points)

#### CRUD operations

<h4>Retrieving todos</h4>

<h5>All todos</h5>

- **Method:** `GET`
- **End point:** `http://localhost:3000/api/todos`
- **STATUS** `200`

<h5>Get todos with filters</h5>
<p>You can retrieve todos with `status, description, title` search criteria.</p>

- **End point:** `http://localhost:3000/api/todos?status=${OPEN}&search=${word}`

- Allowed statuses: `[OPEN, IN_PROGRESS,CLOSED]`
- [Word] matches both title or description of todo.

<h5>Get todos via its `:ID`</h5>

- **End point:** `http://localhost:3000/api/todos/${id}`

<h4>Create new todo</h4>

- **Method** `POST`
- **End point:** `http://localhost:3000/api/todos`
- **Request body:**

```json
{
  "title": "Your todo's title",
  "description": "put some description here"
}
```

- **Response:**

```json
{
  "title": "Your todo's title",
  "description": "put some description here",
  "userId": 1,
  "id": 1,
  "status": "OPEN"
}
```

```bash
userId:   // logged user's id
status:   // default status

```

- **STATUS** `201`

<h4>Edit existed todo' status</h4>

- **Method** `PATCH`
- **End point:** `http://localhost:3000/api/todos/${id}`
- **Request body:**

```json
{
  "status": "IN_PROGRESS"
}
```

- **Response:**

```json
{
	"title": "Your todo's title",
	"description": "put some description here",
  "userId": 1,
  "id": 1,
  "status": **"IN_PROGRESS"**
}
```

- **STATUS** `200`

<h4>Delete existed todo</h4>

- **Method** `DELETE`
- **End point:** `http://localhost:3000/api/todos/${id}`
- **Response:**
  No response returns back

- **STATUS** `200`

#### Authorization & Authentication (Logging)

<h4>Signup or register as a new user</h4>

- **Method** `POST`
- **End point:** `http://localhost:3000/api/signup`
- **Request body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john00@gmail.com",
  "password": "Aa0012345"
}
```

```bash
firstName:  // more than 3 chars
email:      // must be an e-mail
password:   // must be more than or equal 8 chars
```

- **Response:**
  No response returns back

- **STATUS** `201`

<h4>Sign or login as a existed user</h4>

- **Method** `POST`
- **End point:** `http://localhost:3000/api/signin`
- **Request body:**

```json
{
  "email": "john00@gmail.com",
  "password": "Aa0012345"
}
```

- **Response:**
  Login process reduces an `accessToken`, User can use it later to credit his/her self.

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFub3RoZXJAZ21haWwuY29tIiwibmFtZSI6ImFub3RoZXIgYW5vdGhlciIsImlhdCI6MTYyNjQ3OTc5OCwiZXhwIjoxNjI2NDgzMzk4fQ.b5qiHsXfI9klw6mLIv9GKOEEUe8zK6WABXbFS-NAC4E"
}
```

- **STATUS** `200`

##### How to behave with the app

So every future potential request should has accessToken in request header as a **_Bearer token._**

**Header authorization:**

```bash
  "**Bearer** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFub3RoZXJAZ21haWwuY29tIiwibmFtZSI6ImFub3RoZXIgYW5vdGhlciIsImlhdCI6MTYyNjQ3OTc5OCwiZXhwIjoxNjI2NDgzMzk4fQ.b5qiHsXfI9klw6mLIv9GKOEEUe8zK6WABXbFS-NAC4E"
```

</hr>
## Support

Fell free to fork/star **todonest** !!

## Stay in touch

[@salihcodev](https://twitter.com/salihcodev)

## License

[MIT licensed](LICENSE).
