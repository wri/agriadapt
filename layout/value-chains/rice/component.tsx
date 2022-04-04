import { RICE } from "layout/intro-header/constants";
import { ValueChainPageProps } from "types/value-chain";
import LayoutCrop from "../component";

const LayoutRice = ({ cid }: ValueChainPageProps) => {
  return (
      <LayoutCrop header={RICE} user_stories={null} />
  );
};

export default LayoutRice;
