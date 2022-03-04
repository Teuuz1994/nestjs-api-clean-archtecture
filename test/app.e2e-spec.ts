import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { userMock } from '../src/modules/users/infra/typeorm/test/mocks/user-mock';

const mock = userMock();
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should be able to create user using path /users (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(mock);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to list all users using path /users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(response.body.length);
  });
});
