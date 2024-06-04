import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { prismaClient } from '../lib/prismaClient';
import { GoogleApis } from '../services/GoogleApis';

const schema = z.object({
  code: z.string().min(1),
});

export class GoogleSignInController {
  static handle = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const result = schema.safeParse(request.body);

      if (!result.success) {
        return reply.status(400).send({ error: result.error.issues });
      }

      const { code } = result.data;

      const googleAccessToken = await GoogleApis.getAccessToken({
        code,
        redirectUri: 'http://localhost:5173/callbacks/google',
      });

      const { verifiedEmail, ...userInfo } = await GoogleApis.getUserInfo(googleAccessToken);
      await GoogleApis.revokeAccessToken(googleAccessToken);

      if (!verifiedEmail) {
        return reply.status(401).send({
          error: 'Google account is not verified.',
        });
      }

      const user = await prismaClient.user.upsert({
        where: { email: userInfo.email },
        create: userInfo,
        update: {
          googleId: userInfo.googleId,
        },
      });

      const accessToken = await reply.jwtSign({ sub: user.id });

      return reply
        .code(200)
        .send({ accessToken });
    } catch (error) {
      console.log(error);
    }
  };
}
