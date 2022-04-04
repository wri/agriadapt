import IntroHeader from 'layout/intro-header';
import Layout from 'layout/layout/layout-app';
import { ABOUT } from 'layout/intro-header/constants';

const LayoutAbout = () => {
  return (
    <Layout>
      <IntroHeader {...ABOUT} />
      <div>Lorem ipsum text</div>
      <div>
        Other content that naturally pushes the page height further down without
        manually specifying
      </div>
    </Layout>
  );
};

export default LayoutAbout;
