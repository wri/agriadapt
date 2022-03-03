import Layout from "layout/layout/layout-app";
import { ValueChainPageProps } from "types/value-chain";

const LayoutCotton = ({ cid }: ValueChainPageProps) => {
    return (
        <Layout>
            Cotton: {cid}
        </Layout>
    )
}

export default LayoutCotton;