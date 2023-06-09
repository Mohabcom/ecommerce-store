import PaddingContainer from '../../../components/PaddingContainer/PaddingContainer';
import ProductsSwiper from '../../../components/ProductsSwiper/ProductsSwiper';
import getProducts from '../../../utils/getProducts';

export default async function FeaturedDeals() {
    const products = await getProducts();
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
