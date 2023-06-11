import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';

export default function ProductForm({
    _id,
    title: existingTitle,
    category: existingCategory,
    properties: existingProperties,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [category, setCategory] = useState(existingCategory || '');
    const [productProperties, setProductProperties] = useState(
        existingProperties || {},
    );
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    useEffect(() => {
        axios.get('/api/categories').then((res) => {
            setCategories(res.data);
        });
    }, []);

    const saveProduct = async (ev) => {
        ev.preventDefault();
        const data = {
            title,
            category,
            description,
            price,
            images,
            properties: productProperties,
        };
        if (_id) {
            // update
            await axios.put('/api/products', { ...data, _id });
        } else {
            // create
            await axios.post('/api/products', data);
        }
        router.push('/products');
    };
    const uploadImages = async (ev) => {
        setIsUploading(true);
        const files = ev.target?.files;
        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/images', data);
            setImages((oldImages) => {
                return [...oldImages, ...res.data.links];
            });
        }
        setIsUploading(false);
    };
    const updateImagesOrder = (images) => {
        setImages(images);
    };

    let propertieToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        propertieToFill.push(...catInfo.properties);
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(
                ({ _id }) => _id === catInfo?.parent?._id,
            );
            propertieToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }

    const setProductProp = (propName, value) => {
        setProductProperties((prev) => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    };
    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input
                type="text"
                placeholder="Product Name"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <label>Category</label>
            <select
                value={category}
                onChange={(ev) => setCategory(ev.target.value)}
            >
                <option value="">Uncategorized</option>
                {categories.length > 0 &&
                    categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
            </select>
            {propertieToFill.length > 0 && <label>Properties</label>}
            {propertieToFill.length > 0 &&
                propertieToFill.map((p) => (
                    <div key={p.name} className="">
                        <label>
                            {p.name[0].toUpperCase() + p.name.substring(1)}
                        </label>
                        <div>
                            <select
                                value={productProperties[p.name]}
                                onChange={(ev) =>
                                    setProductProp(p.name, ev.target.value)
                                }
                            >
                                <option value={null}></option>
                                {p.values.map((v) => (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            <label>Photos</label>
            <div className="mb-2 flex flex-wrap gap-2">
                <ReactSortable
                    className="flex flex-wrap gap-2"
                    list={images}
                    setList={updateImagesOrder}
                >
                    {!!images?.length &&
                        images.map((link) => (
                            <div key={link} className="h-24">
                                <img
                                    src={link}
                                    className="rounded-lg cursor-pointer"
                                />
                            </div>
                        ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 p-2 flex items-center justify-center">
                        <Spinner />
                    </div>
                )}
                <label className="cursor-pointer w-24 h-24 text-sm gap-1 bg-accent text-white flex flex-col items-center justify-center rounded-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                    </svg>
                    <div>Upload</div>
                    <input
                        type="file"
                        onChange={uploadImages}
                        className="hidden"
                    />
                </label>
            </div>
            <label>Description</label>
            <textarea
                placeholder="Description"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
            />
            <label>Price (in USD)</label>
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
            />
            <div className="flex gap-2">
                {_id && (
                    <button
                        type="button"
                        onClick={() => {
                            router.push('/products');
                        }}
                        className="btn-default"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className={isUploading ? 'btn-default' : 'btn-primary'}
                    disabled={isUploading && 'true'}
                >
                    Save
                </button>
            </div>
        </form>
    );
}
