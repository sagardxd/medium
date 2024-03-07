import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";


export const useBlogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setblogs] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {withCredentials: true})
        .then(res => {
            setblogs(res.data)
            setloading(false)
        })
    }, []);


    return {
        loading,
        blogs
    }
}