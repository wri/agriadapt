// components
import { withSession } from 'hoc/session';
import HeadError from 'layout/head/error';
import { GetServerSideProps } from 'next';

const MaintenancePage = () => {
  return (
    <>
      <HeadError title="Maintenance" />
      <main className="l-error">
        <div className="container">
          <p>This website is under construction</p>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSession();

export default MaintenancePage;
