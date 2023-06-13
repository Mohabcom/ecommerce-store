'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import { ReactSortable } from 'react-sortablejs';
import { useFormik } from 'formik';
import useUploadImage from './hooks/useUploadImage';

export default function ProductForm({
    _id,
    title: existingTitle,
    category: existingCategory,
    properties: existingProperties,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
}) {
    const formik = useFormik({
        initialValues: {
            title: existingTitle || '',
            category: existingCategory || '',
            productProperties: existingProperties || {},
            description: existingDescription || '',
            price: existingPrice || '',
            images: existingImages || [],
        },
        onSubmit: async (values) => {
            const data = {
                title: values.title,
                category: values.category,
                description: values.description,
                price: values.price,
                images: values.images,
                properties: values.productProperties,
            };
            console.log(data);
            if (_id) {
                // update
                await axios.put('/api/products', { ...data, _id });
            } else {
                // create
                await axios.post('/api/products', data);
            }
            router.push('/seller/products');
        },
        // validate: login_validate,
    });
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

    const uploadImage = async (ev) => {
        setIsUploading(true);
        const imageLink = await useUploadImage(ev);
        formik.values.images.push(imageLink);
        setIsUploading(false);
    };

    const updateImagesOrder = (images) => {
        formik.values.images = images;
    };

    let propertieToFill = [];
    if (categories.length > 0 && formik.values.category) {
        let catInfo = categories.find(
            ({ _id }) => _id === formik.values.category,
        );
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
        const oldProps = formik.values.productProperties;
        formik.values.productProperties = { ...oldProps };
        formik.values.productProperties[propName] = value;
    };

    return (
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <label className="text-gray-500 text-sm">Product Name</label>
            <input
                className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
                type="text"
                placeholder="Product Name"
                {...formik.getFieldProps('title')}
            />
            {loadingCategories ? (
                <div>LOADING CATEGORIES...</div>
            ) : (
                <div>
                    <label className="text-gray-500 text-sm">Category</label>
                    <select
                        className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
                        {...formik.getFieldProps('category')}
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
                                value={formik.values.productProperties[p.name]}
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
                    list={formik.values.images}
                    setList={updateImagesOrder}
                >
                    {!!formik.values.images?.length &&
                        formik.values.images.map((link) => (
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
                        onChange={uploadImage}
                        // className="hidden"
                    />
                </label>
            </div>
            <label className="text-gray-500 text-sm">Description</label>
            <textarea
                className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
                placeholder="Description"
                {...formik.getFieldProps('description')}
            />
            <label className="text-gray-500 text-sm">Price (in USD)</label>
            <input
                className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
                type="number"
                placeholder="Price"
                {...formik.getFieldProps('price')}
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
