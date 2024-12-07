const tap = require('tap');
const request = require('supertest');
const app = require('../index');
const User = require('../models/user');

const invalidUser1 = {
};

const invalidUser2 = {
  name: 123,
  email: 123,
  password: 123
}

const invalidUser3 = {
  name: "",
  email: "",
  password: ""
}

const invalidUser4 = {
  name: 123,
  email: "01222@123.123",
  password: "password",
}

const invalidUser5 = {
  name: "Some Test user",
  email: "testuser@someone.com",
  password: "p@ssw0rD",
  role: "admin"
};

const validUser = {
  name: "Some One",
  email: "someone@someone.com",
  password: "p@ssw0rD",
}

tap.test('POST /users/signup - should return status code 400', async (t) => {
  const response = await request(app)
    .post('/users/signup')
    .send(invalidUser1);
  t.equal(response.status, 400);
  t.end();
});

tap.test('POST /users/signup - should return status code 400', async (t) => {
  const response = await request(app)
    .post('/users/signup')
    .send(invalidUser2);
  t.equal(response.status, 400);
  t.end();
});

tap.test('POST /users/signup - should return status code 400', async (t) => {
  const response = await request(app)
    .post('/users/signup')
    .send(invalidUser3);
  t.equal(response.status, 400);
  t.end();
});

tap.test('POST /users/signup - should return status code 400', async (t) => {
  const response = await request(app)
    .post('/users/signup')
    .send(invalidUser4);
  t.equal(response.status, 400);
  t.end();
});

tap.test('POST /users/signup - should return status code 400', async (t) => {
  const response = await request(app)
    .post('/users/signup')
    .send(invalidUser5);
  t.equal(response.status, 400);
  t.end();
});

tap.test('POST /users/signup - should return status code 201', async (t) => {
  const response = await request(app)
    .post('/users/signup')
    .send(validUser);
  t.equal(response.status, 201);
  t.end();
});

tap.test('POST /users/signup - should return status code 400', async (t) => {
  const response = await request(app)
    .post('/users/signup')
    .send(validUser);
  t.equal(response.status, 400);
  t.end();
});

tap.teardown( async () => {
  User.deleteOne({email: validUser.email}).then(() => {
    process.exit(0);
  });
});
