import MockAdapter from 'axios-mock-adapter';
import { v4 as uuid } from 'uuid';
import { api } from './axiosInstance';
import { seedVisitors, seedUser, MOCK_CREDENTIALS } from '@/data/mockVisitors';
import type { Visitor } from '@/types/visitor';

let visitors: Visitor[] = JSON.parse(JSON.stringify(seedVisitors));

const mock = new MockAdapter(api, { delayResponse: 500 });

mock.onPost('/auth/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);
  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    return [200, { token: `mock-token-${uuid()}`, user: seedUser }];
  }
  return [401, { message: 'Invalid email or password.' }];
});

mock.onGet('/visitors').reply(() => {
  return [200, visitors];
});


mock.onGet(/\/visitors\/[\w-]+$/).reply((config) => {
  const id = config.url!.split('/').pop();
  const visitor = visitors.find((v) => v.id === id);
  if (!visitor) return [404, { message: 'Visitor not found.' }];
  return [200, visitor];
});

mock.onPost('/visitors').reply((config) => {
  const body = JSON.parse(config.data);

  if (!body.name || !body.phone || !body.unit || !body.visitDate) {
    return [422, { message: 'Name, phone, unit and visit date are all required.' }];
  }

  const newVisitor: Visitor = {
    id: `v-${uuid().slice(0, 8)}`,
    name: body.name,
    phone: body.phone,
    unit: body.unit,
    visitDate: body.visitDate,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  visitors = [newVisitor, ...visitors];
  return [201, newVisitor];
});

// PUT /visitors/:id
mock.onPut(/\/visitors\/[\w-]+$/).reply((config) => {
  const id = config.url!.split('/').pop();
  const body = JSON.parse(config.data);
  const index = visitors.findIndex((v) => v.id === id);
  if (index === -1) return [404, { message: 'Visitor not found.' }];

  visitors[index] = { ...visitors[index], ...body };
  return [200, visitors[index]];
});

mock.onDelete(/\/visitors\/[\w-]+$/).reply((config) => {
  const id = config.url!.split('/').pop();
  const exists = visitors.some((v) => v.id === id);
  if (!exists) return [404, { message: 'Visitor not found.' }];

  visitors = visitors.filter((v) => v.id !== id);
  return [200, { message: 'Visitor deleted.' }];
});

mock.onPatch(/\/visitors\/[\w-]+\/approve$/).reply((config) => {
  const id = config.url!.split('/')[2];
  const index = visitors.findIndex((v) => v.id === id);
  if (index === -1) return [404, { message: 'Visitor not found.' }];

  visitors[index] = { ...visitors[index], status: 'approved' };
  return [200, visitors[index]];
});

mock.onPatch(/\/visitors\/[\w-]+\/reject$/).reply((config) => {
  const id = config.url!.split('/')[2];
  const index = visitors.findIndex((v) => v.id === id);
  if (index === -1) return [404, { message: 'Visitor not found.' }];

  visitors[index] = { ...visitors[index], status: 'rejected' };
  return [200, visitors[index]];
});

export default mock;
