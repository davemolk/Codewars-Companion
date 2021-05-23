# Codewars Companion

Codewars is a great resource for practicing different coding languages and strategies, but it lacks any ability to organize your completed katas. Codewars Companion allows you to create tags and organize your completed katas by subject, thus saving you from having to dig through your archives for what you want.

[TODO] LINK, TEST USER LOGIN, LOGIN PAGE SCREENSHOT

## Technologies Used

- Node/Express with EJS templating and layouts
- Passport and Bcrypt
- Sequelize
- Codewars API with Axios
- [TODO] FINISH THIS

### User Stories

The intended user is someone active on Codewars who wants a customizable way to organize their kata solutions.

- As a user, I want to...
  - be able to tag my codewars katas with a subject. For instance, I would like to group together all katas that focus on arrays.
  - be able to tag a single kata with multiple subjects.
  - be able to select a subject and see all katas associated with that subject.

### Routes and Models

**Routes**

| CRUD | Route        | Function                               |
| ---- | ------------ | -------------------------------------- |
| GET  | /            | home page                              |
| GET  | /auth/login  | renders login form                     |
| POST | /auth/login  | logs in existing user                  |
| GET  | /auth/signup | renders signup form                    |
| POST | /auth/signup | creates a new user                     |
| GET  | /auth/logout | logs out user and removes session info |
| GET  | /profile     | renders user profile                   |
| GET  | /katas       | renders user profile                   |
| GET  | /profile     | renders user profile                   |

**Models**
put them here

## Code Excerpts

## Known Issues

put them here

## Future Considerations

put them here
