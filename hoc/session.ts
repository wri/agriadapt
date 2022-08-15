import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';

export const withSession = (getServerSidePropsFunc: GetServerSideProps) => {
  return withIronSessionSsr(getServerSidePropsFunc, {
    cookieName: 'user',
    password: process.env.SECRET || 'zkrKxRNs4Pr1Rypkmh36C097hhqryCas',
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
