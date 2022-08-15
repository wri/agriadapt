import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';

export const withSession = (getServerSidePropsFunc: GetServerSideProps) => {
  return withIronSessionSsr(getServerSidePropsFunc, {
    cookieName: 'user_country',
    password: process.env.SECRET || 'keyboard cat',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
};

declare module "iron-session" {
    interface IronSessionData {
      user?: {
        country: string;
      };
    }
}
