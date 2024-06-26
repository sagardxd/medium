import { Blog } from "../hooks"
import AppBar from "./AppBar"
import { Avatar } from "./BlogCard"

const formattedContent = (content: any) => {
    const paragraphs = content.split("\n\n"); // Split text into paragraphs based on double line breaks
    const formattedParagraphs = paragraphs.map((paragraph: any, index: any) => (
        <p key={index}>{paragraph}</p> // Wrap each paragraph in <p> tags
    ));
    return formattedParagraphs;
};


const SingleBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <AppBar />
            <div className="flex  justify-center">
                <div className="grid grid-cols-12 px-12  pt-10 w-full max-w-screen-xl">
                    <div className="col-span-8 ">
                        <div className="flex flex-col gap-1">
                            <div className="text-5xl font-extrabold">
                                {blog.title}
                            </div>
                            <div className="text-slate-500">
                                Posted on {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                            <div className="">
                                {formattedContent(blog.content)}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 ">
                        <div className="flex flex-col gap-2 font-semibold text-slate-700">
                            Author
                            <div className="flex gap-2 ">
                                <div className="flex flex-col justify-center">
                                    <Avatar name={blog.author.name} size="big" />
                                </div>
                                <div className="flex flex-col text-black">
                                    <div className="text-lg font-bold">
                                        {blog.author.name}
                                    </div>
                                    <div className="text-slate-400 pt-1">
                                        Author details
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBlog
