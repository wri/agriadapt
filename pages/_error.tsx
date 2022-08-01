// components
import HeadError from 'layout/head/error';
import LayoutError from 'layout/error';

const ErrorPage = ({ statusCode }: { statusCode: number }) => {
  return (
    <>
      <HeadError title="Error" />
      <LayoutError
        statusCode={statusCode}
        description="Sorry, an error occurred."
      />
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;

  return {
    statusCode,
  };
};

export default ErrorPage;
