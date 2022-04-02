import ContentHeader from 'layout/content-header';
import Layout from 'layout/layout/layout-app';
import { ABOUT } from 'layout/content-header/constants';

const LayoutAbout = () => {
  return (
    <Layout>
      <ContentHeader {...ABOUT} />
      <div>Lorem ipsum text</div>
      <div>
        Other content that naturally pushes the page height further down without
        manually specifying
      </div>
    </Layout>
  );
};

export default LayoutAbout;
