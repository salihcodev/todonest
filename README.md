## Description

Simple todo list application built with [**Nest**](https://github.com/nestjs/nest) framework, With fully CRUD operation features, Auth and logging system feature implemented as well!

---

## Installation

```
$ npm install
```

## Running the app

```
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

## File Structure

```
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

---

## How to use

## Available APIs (end-points)

### CRUD operations

<h3>Retrieving todos</h3>

<h4>All todos</h4>

- **Method:** `GET`
- **End point:** `http://localhost:3000/api/todos`
- **STATUS** `200`

<h4>Get todos with filters</h4>
<p>You can retrieve todos with `status, description, title` search criteria.</p>

- **End point:** `http://localhost:3000/api/todos?status=${OPEN}&search=${word}`

- **Allowed statuses:** `[OPEN, IN_PROGRESS,CLOSED]`
- **[Word]** matches both title or description of todo.

<h4>Get todos via its :ID</h4>

- **End point:** `http://localhost:3000/api/todos/${id}`

<br>
<br>

<h3>Create new todo</h3>

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

> userId: // logged user's id
> status: // default status

- **STATUS** `201`

<h3>Edit existed todo' status</h3>

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
  "status": "IN_PROGRESS"
}
```

- **STATUS** `200`

<br>

<h3>Delete existed todo</h3>

- **Method** `DELETE`
- **End point:** `http://localhost:3000/api/todos/${id}`
- **Response:**
  No response returns back

- **STATUS** `200`

<br>
<br>

#### Authorization & Authentication (Logging)

<h3>Signup or register as a new user</h3>

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

> firstName: // more than 3 chars
> email: // must be an e-mail
> password: // must be more than or equal 8 chars

- **Response:**
  No response returns back

- **STATUS** `201`

<h3>Sign or login as a existed user</h3>

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

<br>

##### How to behave with the app

So every future potential request should has accessToken in request header as a **_Bearer token._**

**Header authorization:**

```
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFub3RoZXJAZ21haWwuY29tIiwibmFtZSI6ImFub3RoZXIgYW5vdGhlciIsImlhdCI6MTYyNjQ3OTc5OCwiZXhwIjoxNjI2NDgzMzk4fQ.b5qiHsXfI9klw6mLIv9GKOEEUe8zK6WABXbFS-NAC4E"
```

---

## Support

Fell free to fork/star **todonest** !!

## Stay in touch

[@salihcodev](https://twitter.com/salihcodev)

## License

[MIT licensed](LICENSE).
