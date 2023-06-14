export default async function getProducts(id?: string) {
    let link = `http://localhost:3000/api/products`;
    if (id) {
        link += `/${id}`;
    }

    const res = await fetch(link, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}