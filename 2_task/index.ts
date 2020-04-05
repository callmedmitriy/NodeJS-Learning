import express = require('express');
import bodyParser = require('body-parser');
import Joi = require('@hapi/joi');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Function for id generate
const idGenerator = (startId: number) => {
  let firstId = startId;
  return () => {
    return firstId++;
  }
}
const createId = idGenerator(1);

interface User {
  id: number,
  login: string;
  password: string;
  age: number;
  isDeleted: boolean,
}

let userList: User[] = [];

// Filter user list by start string and return limit count
const getAutoSuggestUsers = (loginSubstring: string, limit: number) => {
  let newList = userList.filter( user => user.login.startsWith(loginSubstring));
  newList.sort((first, second) => first.login > second.login ? 1 : -1);
  newList = newList.slice(0, limit);
  return newList;
}

// Server-side validation for create/update operations of User entity
const schema = Joi.object({
  id: Joi.number()
    .integer(),

  login: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

    age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required(),
})

// Server start
app.listen(3000, () => {
  console.log('App was running and listening port 3000');
});

app.route('/user/:id')
  .get((req, res) => {
    const userById: User = userList.filter( user => user.id == req.params.id )[0];
    const sendData: string = userById ? JSON.stringify(userById, null, ' ') : 'Deleted successfully';
    res.send(sendData);
  })
  .delete((req, res) => {
    let deleted: boolean = false;
    userList = userList.map( user => {
      if (user.id == req.params.id) {
        user.isDeleted = true;
        deleted = true;
      }
      return user;
    });
    const sendData: string = deleted ? 'Deleted successfully' : 'User not founded';
    res.send(sendData);
  })

app.route('/user')
  .get((req,res) => {
    res.send(userList);
  })
  .post((req,res) => {
    const params = req.body;
    const { error, value } = schema.validate(params);
    let sendData;
    if (error) {

      sendData = error.message;
      res.status(400);

    } else if (params.id) {

      userList = userList.map(user => {
        if (user.id == params.id) {
          user = {
            ...user,
            ...params
          }
        }
        return user;
      });

      sendData = 'User updated successfully';

    } else {

      const newUser: User = {
        id: createId(),
        ...params,
        isDeleted: false,
      };
      userList = [...userList,newUser]
      sendData = 'User created successfully';

    }
    res.send(sendData);
  })

app.get('/filter',(req,res) => {
  const starts: string = req.query.starts;
  const limit: number = req.query.limit || 5;
  res.send(getAutoSuggestUsers(starts,limit));
});


// Temp data
const One: User = {
  id: createId(),
  login: "Name_a",
  password: "somepassword",
  age: 13,
  isDeleted: false,
}
const Two: User = {
  id: createId(),
  login: "Name_d",
  password: "pas",
  age: 14,
  isDeleted: false,
}
const Three: User = {
  id: createId(),
  login: "Name_b",
  password: "qwerty",
  age: 43,
  isDeleted: false,
}
const Four: User = {
  id: createId(),
  login: "Name_c",
  password: "somepassword",
  age: 13,
  isDeleted: false,
}
const Five: User = {
  id: createId(),
  login: "Natasha",
  password: "pas",
  age: 14,
  isDeleted: false,
}
const Six: User = {
  id: createId(),
  login: "Nanana",
  password: "qwerty",
  age: 43,
  isDeleted: false,
}

userList = [One, Two, Three, Four, Five, Six];