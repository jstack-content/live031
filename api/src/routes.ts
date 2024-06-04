import { FastifyInstance } from 'fastify';

import { GoogleSignInController } from './controllers/GoogleSignInController';
import { authMiddleware } from './middlewares/authMiddleware';

export async function publicRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/google', GoogleSignInController.handle);
}

export async function privateRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', authMiddleware);

  fastify.get('/private', (request, reply) => {
    return reply.code(200).send({ ok: true });
  });
}
