import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';

// Replace usage when using an architecture that supports Next.js 12's Middleware
export const withSession = (getServerSidePropsFunc?: GetServerSideProps) => {
  return withIronSessionSsr(
    async (context) => {
      const { req } = context;
      const worldview =
        req.headers['cloudfront-viewer-country'] ??
        req.session.user?.country ??
        'US';
      // const worldview = 'IN';
      req.session.user = {
        country: Array.isArray(worldview) ? worldview.join('') : worldview,
      };
      await req.session.save();

      if (getServerSidePropsFunc) {
        const SSPF = await getServerSidePropsFunc(context);
        return SSPF;
      } else return { props: {} };
    },
    {
      cookieName: 'agriadapt_cookie',
      password: process.env.SECRET || 'zkrKxRNs4Pr1Rypkmh36C097hhqryCas',
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
      },
    }
  );
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      country: string;
    };
  }
}
