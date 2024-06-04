import { FastifyReply, FastifyRequest } from 'fastify';

export class GoogleSignInController {
  static handle = async (request: FastifyRequest, reply: FastifyReply) => {
    return reply
      .code(200)
      .send({ google: true });
  };
}
