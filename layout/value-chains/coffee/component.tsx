import Layout from "layout/layout/layout-app";
import { ValueChainPageProps } from "types/value-chain";

const LayoutCoffee = ({ cid }: ValueChainPageProps) => {
    return (
        <Layout>
            Coffee: {cid}
        </Layout>
    )
}

export default LayoutCoffee;