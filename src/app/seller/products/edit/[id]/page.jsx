import ProductForm from '@/components/seller/ProductForm/ProductForm';
import getProducts from '@/utils/getProducts';

export default async function EditProduct({ params }) {
    const { id } = params;
    const product = await getProducts(id);
    return (
        <>
            <h1>Edit Product</h1>
            {product && <ProductForm {...product} />}
        </>
    );
}
