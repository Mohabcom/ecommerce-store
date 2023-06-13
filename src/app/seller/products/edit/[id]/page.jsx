import ProductForm from '@/components/seller/ProductForm/ProductForm';

async function getData(id) {
    const res = await fetch(`http://localhost:3000//api/products/${id}`, {
        // cache: 'no-store',
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function EditProduct({ params }) {
    const { id } = params;
    const product = await getData(id);
    return (
        <>
            <h1>Edit Product</h1>
            {product && <ProductForm {...product} />}
        </>
    );
}
