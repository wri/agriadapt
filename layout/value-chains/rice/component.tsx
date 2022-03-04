import Layout from "layout/layout/layout-app";
import { ValueChainPageProps } from "types/value-chain";
import WidgetBlock from 'components/wysiwyg/widget-block';

const LayoutRice = ({ cid, widget }: ValueChainPageProps) => {

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