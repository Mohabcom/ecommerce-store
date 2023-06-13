import PaddingContainer from '@/components/PaddingContainer/PaddingContainer';
import ProductsSwiper from '@/components/ProductsSwiper/ProductsSwiper';

async function getData() {
    const res = await fetch('http://localhost:3000/api/products', {
        cache: 'no-store',
        // next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function FeaturedDeals() {
    const products = await getData();
    return (
        <section>
            <PaddingContainer className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                    Today's Featured Deals
                </h2>

                <ProductsSwiper products={products} />
            </PaddingContainer>
        </section>
    );
}
