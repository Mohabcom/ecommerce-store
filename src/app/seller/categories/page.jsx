'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { withSwal } from 'react-sweetalert2';

export default function SellerCategories() {
    const [name, setName] = useState('');
    const [editedCategory, setEditedCategory] = useState(null);
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const fetchedCategories = await axios.get('/api/categories');
        setCategories(fetchedCategories.data);
    };

    const saveCategory = async (ev) => {
        ev.preventDefault();
        const data = {
            name,
            parentCategory,
            properties: properties.map((p) => ({
                name: p.name,
                values: p.values.split(','),
            })),
        };
        if (editedCategory) {
            await axios.put('/api/categories', {
                ...data,
                _id: editedCategory._id,
            });
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', data);
        }
        setName('');
        setParentCategory('');
        setProperties([]);
        fetchCategories();
    };
    const editCategory = async (category) => {
        setEditedCategory(category);
        setName(category.name);

        setProperties(
            category.properties.map(({ name, values }) => ({
                name,
                values: values.join(','),
            })),
        );
        if (category.parent?._id) {
            setParentCategory(category.parent?._id);
        } else {
            setParentCategory('');
        }
    };
    const deleteCategory = async (category) => {
        await axios.delete('/api/categories?id=' + category._id);
        fetchCategories();
        // swal.fire({
        //     title: 'Are you sure?',
        //     text: `Do you really want to delete "${category.name}"?`,
        //     showCancelButton: true,
        //     cancelButtonText: 'Cancel',
        //     cancelButtonColor: '#48585B',
        //     confirmButtonText: 'Delete',
        //     confirmButtonColor: '#d55',
        //     // reverseButtons: true,
        // }).then(async (result) => {
        //     if (result.isConfirmed) {
        //         await axios.delete('/api/categories?id=' + category._id);
        //         fetchCategories();
        //     }
        // });
    };

    const addProperty = () => {
        setProperties((prev) => {
            return [...prev, { name: '', values: '' }];
        });
    };
    const handlelePropertyNameChange = (index, property, newName) => {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    };
    const handlelePropertyValuesChange = (index, property, newValues) => {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    };

    const removeProperty = (index) => {
        setProperties((prev) => {
            const properties = [...prev].filter((p, pIndex) => {
                return pIndex !== index;
            });
            return properties;
        });
    };

    return (
        <>
            <h1>Categories</h1>
            <label className="text-gray-500 text-sm">
                {editedCategory
                    ? `Edit Category ${editedCategory.name}`
                    : 'New Category Name'}
            </label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">
                    <input
                        className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
                        type="text"
                        placeholder={'Category Name'}
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                    <select
                        className="border border-gray-200 rounded-sm p-2 w-full mb-2 focus:border-green-700"
                        value={parentCategory}
                        onChange={(ev) => setParentCategory(ev.target.value)}
                    >
                        <option value="">No Parent Category</option>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <option value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="text-gray-500 text-sm block">
                        Properties
                    </label>
                    <button
                        type="button"
                        className="bg-gray-500 px-4 py-2 rounded text-white mb-2"
                        onClick={addProperty}
                    >
                        Add New Property
                    </button>
                    {properties.length > 0 &&
                        properties.map((property, index) => (
                            <div className="flex gap-1 mb-2">
                                <input
                                    className="border border-gray-200 rounded-sm p-2 w-full mb-0 focus:border-green-700"
                                    type="text"
                                    placeholder={'Property Name'}
                                    value={property.name}
                                    onChange={(ev) =>
                                        handlelePropertyNameChange(
                                            index,
                                            property,
                                            ev.target.value,
                                        )
                                    }
                                />
                                <input
                                    className="border border-gray-200 rounded-sm p-2 w-full mb-0 focus:border-green-700"
                                    type="text"
                                    placeholder={'Values (seperated by commas)'}
                                    value={property.values}
                                    onChange={(ev) =>
                                        handlelePropertyValuesChange(
                                            index,
                                            property,
                                            ev.target.value,
                                        )
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => removeProperty(index)}
                                    className="bg-red-200 text-red-700 px-4 py-2 rounded-sm border border-gray-200 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                </div>
                <div className="flex gap-1">
                    {editedCategory && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setName('');
                                setParentCategory('');
                                setProperties([]);
                            }}
                            className="px-4 py-2 rounded-sm shadow-md bg-white text-gray-600 border border-gray-200 "
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="bg-green-700 px-4 py-2 rounded text-white mb-2"
                    >
                        Save
                    </button>
                </div>
            </form>
            {!editedCategory && (
                <table className="basic mt-3">
                    <thead>
                        <tr>
                            <td>Category Name</td>
                            <td>Parent Category</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <tr>
                                    <td>{category.name}</td>
                                    <td>{category?.parent?.name}</td>
                                    <td className="flex justify-center items-center gap-2">
                                        <button
                                            onClick={() =>
                                                editCategory(category)
                                            }
                                            className="px-4 py-2 rounded-sm shadow-md bg-white text-gray-600 border border-gray-200 "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteCategory(category)
                                            }
                                            className="bg-red-200 text-red-700 px-4 py-2 rounded-sm border border-gray-200"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

// export default withSwal(({ swal }, ref) => {
//     return <Categories swal={swal} />;
// });
