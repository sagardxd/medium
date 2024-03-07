import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
    "content": string;
    "title": string;
    "id": string;
    "author": {
        "name": string;
    }
}

//fetches a single blog
export const useBlog = ({id} : {id: string}) => {
    const [loading, setloading] = useState(true);
    const [blog, setblog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, { withCredentials: true })
            .then(res => {
                setblog(res.data)
                setloading(false)
            })
    }, [id]);

    return {
        loading,
        blog
    }
}

//fetches all blogs
export const useBlogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setblogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, { withCredentials: true })
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