import Layout from "layout/layout/layout-app";
import { ValueChainPageProps } from "types/value-chain";
import WidgetBlock from 'components/wysiwyg/widget-block';
import { useFetchWidget } from "hooks/widget";
import Icon from "components/ui/icon";

const LayoutRice = ({ cid }: ValueChainPageProps) => {

    const { data: widget } = useFetchWidget('20096f90-59c5-483c-9bfa-4d998ec4ce15');
    return (
        <Layout>
            Rice: {cid}
            <div style={{width: 500, margin: '0 auto'}}>
                {widget && <WidgetBlock widget={widget} />}
            </div>
        </Layout>
    )
}

export default LayoutRice;