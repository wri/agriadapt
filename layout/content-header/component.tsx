/* eslint-disable @typescript-eslint/no-unused-vars */

const ContentHeader = ({ title = '', subheader = '', description = [''] }) => {
  return (
    <>
      {/* the image stuff...  */}
      <div className="image-container" />
      {/* The info stuff... */}
      <div className="info-container">
        <h2>{title}</h2>
        <h3>{subheader}</h3>
        {description.map((d, i) => (
          <p key={`desc-${i}`}>{d}</p>
        ))}
      </div>
    </>
  );
};

export default ContentHeader;
