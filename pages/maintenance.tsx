// components
import HeadError from 'layout/head/error';

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

export default MaintenancePage;