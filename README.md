# Codewars Companion

Codewars is a great resource for practicing different coding languages and strategies, but it lacks any ability to organize your completed katas. Codewars Companion allows you to create tags and organize your completed katas by subject, thus saving you from having to dig through your archives for what you want.

Find it here: https://codewars-companion.herokuapp.com/ (make sure you're signed into your Codewars account before signing up or logging in to Codewars Companion)

![Login](public/img/login.png)
![Profile](public/img/profile.png)
![Action](public/img/action.png)

## Technologies Used

- Node/Express with EJS templating and layouts
- Passport and Bcrypt
- Sequelize
- CSS Bootstrap
- Codewars API and Axios

### User Stories

The intended user is someone active on Codewars who wants a customizable way to organize their kata solutions.

- As a user, I want to...

  - be able to create a list of favorite katas.
  - be able to tag my codewars katas with a subject. For instance, I would like to group together all katas that focus on arrays.
  - be able to select a subject and see all katas associated with that subject.

### Code Excerpts

### Known Issues

- The subject model needs a userId and the code should be updated so that subjects

## Future Considerations

(in no particular order)

- Simplify the "Tag kata" process.
- Allow multiple tags on a kata.
- Toggle between languages. The API call currently pulls down all solved challenges, but the "more info", "train again", and "solutions" links are all specific to JavaScript.
- pull down solutions to the page instead of linking to them
