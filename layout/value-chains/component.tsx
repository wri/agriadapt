import ContentHeader from "layout/content-header";
import HazardsFlow from "./content/flow-diagram";
import HazardsIntro from "./content/hazards-intro";
import ItemInfos from "./content/item-infos";
import ItemIntro from "./content/item-intro";
import UserStories from "./content/user-stories";
import Layout from 'layout/layout/layout-app';

const LayoutCrop = ({ header, user_stories }) => {
  return (
    // TODO: Translate
    <Layout title={'Value Chains'}>
      <div className="l-crop">
        <ContentHeader {...header} />
        <UserStories {...user_stories} />
        <HazardsIntro />
        <HazardsFlow />
        <ItemIntro />
        <ItemInfos />
      </div>
    </Layout>
  );
};

export default LayoutCrop;
