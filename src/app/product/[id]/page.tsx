import ProductPreview from '../../../components/ProductPreview/ProductPreview';
import getProducts from '../../../utils/getProducts';

export default async function page(props: { params: { id: string } }) {
    const { id } = props.params;
    const product = await getProducts(id);
    return (
        <div>
            <ProductPreview product={product} />
        </div>
    );
}
