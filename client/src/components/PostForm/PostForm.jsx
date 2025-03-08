import React, { useState } from "react";

const PostForm = ({ initialValues = {}, onSubmit  }) => {
    const [loading,setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: initialValues.title || "",
        content: initialValues.content || "",
        photo: null,
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!formData.title.trim()) tempErrors.title = "Title is required.";
        if (!formData.content.trim()) tempErrors.content = "Description is required.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true)
            await onSubmit(formData);
            setLoading(false)
            setFormData({
                    title: "",
                    content:  "",
                    photo: null,})
        }
    };

    return (
        <form aria-disabled={loading} onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                ></textarea>
                {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Photo</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
            </div>

            <button disabled={loading} type="submit" className={` bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${loading? 'bg-gray-500 hover:bg-gray-700 cursor-no-drop':"cursor-pointer"}` }>
                {initialValues.title ? "Update Post" : "Create Post"}
            </button>
        </form>
    );
};

export default PostForm;
