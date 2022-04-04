import { COTTON } from "layout/content-header/constants";
import { ValueChainPageProps } from "types/value-chain";
import LayoutCrop from "../component";

const LayoutCotton = ({ cid }: ValueChainPageProps) => {
  return (
      <LayoutCrop header={COTTON} user_stories={null}/>
  );
};

export default LayoutCotton;
