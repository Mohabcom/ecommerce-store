'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
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
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getCategories = async () => {
            setLoadingCategories(true);
            await axios.get('/api/categories').then((res) => {
                setCategories(res.data);
            });
            setLoadingCategories(false);
        };
        getCategories();
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
        router.push('/seller/products');
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

    // const [propertieToFill, setpropertieToFill] = useState([]);
    // useEffect(() => {
    //     if (categories.length > 0 && category) {
    //         let catInfo = categories.find(({ _id }) => _id === category);
    //         propertieToFill.push(...catInfo.properties);
    //         while (catInfo?.parent?._id) {
    //             const parentCat = categories.find(
    //                 ({ _id }) => _id === catInfo?.parent?._id,
    //             );
    //             propertieToFill.push(...parentCat.properties);
    //             catInfo = parentCat;
    //         }
    //     }
    // }, [categories]);

    const setProductProp = (propName, value) => {
        setProductProperties((prev) => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    };
    return (
        <form className="flex flex-col" onSubmit={saveProduct}>
            <label className="text-gray-500 text-sm">Product Name</label>
            <input
                className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
                type="text"
                placeholder="Product Name"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            {loadingCategories ? (
                <div>LOADING CATEGORIES...</div>
            ) : (
                <div>
                    <label className="text-gray-500 text-sm">Category</label>
                    <select
                        className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
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
                </div>
            )}
            {propertieToFill.length > 0 && (
                <label className="text-gray-500 text-sm">Properties</label>
            )}
            {propertieToFill.length > 0 &&
                propertieToFill.map((p) => (
                    <div key={p.name} className="">
                        <label className="text-gray-500 text-sm">
                            {p.name[0].toUpperCase() + p.name.substring(1)}
                        </label>
                        <div>
                            <select
                                className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
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
            <label className="text-gray-500 text-sm">Photos</label>
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
                                    className="rounded-lg cursor-pointer max-h-full"
                                />
                            </div>
                        ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 p-2 flex items-center justify-center">
                        <Spinner />
                    </div>
                )}
                <label className="cursor-pointer w-24 h-24 text-sm gap-1 bg-green-700 text-white flex flex-col items-center justify-center rounded-sm">
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
                        className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700 hidden"
                        type="file"
                        onChange={uploadImages}
                        // className="hidden"
                    />
                </label>
            </div>
            <label className="text-gray-500 text-sm">Description</label>
            <textarea
                className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
                placeholder="Description"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
            />
            <label className="text-gray-500 text-sm">Price (in USD)</label>
            <input
                className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
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
                            router.push('/seller/products');
                        }}
                        className="px-4 py-2 rounded-sm shadow-md bg-white text-gray-600 border border-gray-200"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className={`px-4 py-2 rounded-sm shadow-md ${
                        isUploading
                            ? ' bg-white text-gray-600 border border-gray-200'
                            : 'bg-green-700 text-white'
                    }`}
                >
                    Save
                </button>
            </div>
        </form>
    );
}
