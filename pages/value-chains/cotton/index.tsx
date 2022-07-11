import LayoutCotton from "layout/value-chains/cotton";
import { GetStaticProps } from "next";
import { ValueChainPageProps } from "types/value-chain";

const CottonPage = ({ countries }: ValueChainPageProps) => {
  return <LayoutCotton countries={countries} />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      countries: [
        {
          label: 'India',
          value: '45d0f6f887a18df373fa69c3eb6f13c7',
        },
        {
          label: 'United States',
          value: '0d9498ae40d288424ed5d570c999007e',
        },
        {
          label: 'Canada',
          value: 'c2402404ba6c37d2fde34e929700a896',
        },
        {
          label: 'Colombia',
          value: '298fc2cf079fb1439a4ad816d258a965',
        },
      ],
    },
  };
};

export default CottonPage;
