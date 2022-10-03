import { useRouter } from 'next/router';

// components
import LayoutEmbedWidget from 'layout/embed/widget';
import { GetServerSideProps } from 'next';

const EmbedWidgetPage = () => {
  const {
    query: { webshot, aoi, ...restQueryParams },
  } = useRouter();

  return (
    <LayoutEmbedWidget
      {...(webshot && { isWebshot: true })}
      // params={restQueryParams}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;

  return {
    props: {
      id,
    }
  }
}

export default EmbedWidgetPage;
