import React from 'react';
import Link from 'next/link';

const LayoutError = ({
  statusCode,
  description = 'Something went wrong',
}: {
  statusCode: number;
  description: string;
}) => {
  return (
    <main className="l-error">
      <div className="container">
        <h1>{statusCode}</h1>
        <p>{description}</p>
        <Link href="/">
          <a className="c-button -primary">Go to AgriAdapt</a>
        </Link>
      </div>
    </main>
  );
};

export default LayoutError;
