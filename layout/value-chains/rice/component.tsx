import Layout from "layout/layout/layout-app";
import { ValueChainPageProps } from "types/value-chain";
import WidgetBlock from 'components/wysiwyg/widget-block';
import { useFetchWidget } from "hooks/widget";

const LayoutRice = ({ cid }: ValueChainPageProps) => {

    const { data: widget } = useFetchWidget('dc8a4c78-60c9-491f-88a3-e31b3626c598');
    return (
        <Layout>
            Rice: {cid}
            {/* {widget && <WidgetBlock item={{}}/>} */}
        </Layout>
    )
}

export default LayoutRice;