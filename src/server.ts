import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { postRoomsQuestions } from './http/routes/create-questions.ts';
import { postRoomsRoute } from './http/routes/create-rooms.ts';
import { getRoomsQuestions } from './http/routes/get-room-questions.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);

app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
  return { status: 'ok' };
});

app.register(getRoomsRoute);
app.register(postRoomsRoute);
app.register(getRoomsQuestions);
app.register(postRoomsQuestions);

app.listen({ port: env.PORT });
