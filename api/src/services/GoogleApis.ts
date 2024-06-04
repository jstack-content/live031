import axios from 'axios';
import qs from 'qs';
import { env } from '../config/env';

interface IGetAccessTokenParams {
  code: string;
  redirectUri: string;
}

interface IUserInfoResponse {
  googleId: string;
  email: string;
  verifiedEmail: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export class GoogleApis {
  static async getAccessToken({ code, redirectUri }: IGetAccessTokenParams) {
    const options = qs.stringify({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    });

    const { data } = await axios.post<{ access_token: string }>(
      'https://oauth2.googleapis.com/token',
      options,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return data.access_token;
  }

  static async getUserInfo(accessToken: string): Promise<IUserInfoResponse> {
    const { data } = await axios.get(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return {
      email: data.email,
      googleId: data.id,
      verifiedEmail: data.verified_email,
      firstName: data.given_name,
      lastName: data.family_name,
      avatar: data.picture,
    };
  }

  static async revokeAccessToken(accessToken: string) {
    await axios.post(
      'https://oauth2.googleapis.com/revoke',
      qs.stringify({ token: accessToken }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}
