import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

export const postRoomsQuestions: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        body: z.object({
          questions: z.string().min(1, 'questions is required'),
        }),
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params;
      const { questions } = request.body;

      const result = await db
        .insert(schema.questions)
        .values({
          roomId,
          questions,
        })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        reply.status(500).send({ error: 'Failed to question' });
        return;
      }
      return reply.status(201).send({
        message: 'Question created successfully',
        roomId: insertedQuestion.id,
      });
    }
  );
};
