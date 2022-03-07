import Layout from "layout/layout/layout-app";
import { ValueChainPageProps } from "types/value-chain";
import WidgetBlock from 'components/wysiwyg/widget-block';

const LayoutRice = ({ cid, widgets }: ValueChainPageProps) => {

    return (
        <Layout>
            Rice: {cid}
            <div style={{width: 500, margin: '0 auto'}}>
                {widgets.map(w => (w && <WidgetBlock widget={w} />))}
            </div>
        </Layout>
    )
}

export default LayoutRice;