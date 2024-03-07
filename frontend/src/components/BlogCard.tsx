
interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

const BlogCard = ({ authorName, title, content, publishedDate }: BlogCardProps) => {
    return (
        <div className="flex flex-col p-4 gap-3 py-6">
            <div className="flex text-sm gap-2">
                <div className="flex flex-col justify-center">
                <Avatar name={authorName} size="small" />
                </div>
                <div className="text-black">
                    {authorName}
                </div>
                <div className="  flex flex-col justify-center">
                    <Circle/>
                </div>
                <div className="font-normal text-slate-500">
                 {publishedDate}
                </div>
            </div>
            <div>
            <div className="text-xl font-bold flex flex-col justify-center">
                {title}
            </div>
            <div className="text-gray-500 flex flex-col justify-center">
                {(content.length > 100) ? content.slice(0, 100) + "..." : content}
            </div>
            </div>
            <div className="text-sm text-slate-500 font-extralight">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
            <div className="border-b-2 pt-1"></div>
        </div>
    )
}

export function Avatar({ name, size }: { name: string , size: "small" | "big"}) {
    return <div className={`relative inline-flex items-center justify-center ${size=="small" ? "w-5 h-5" : "w-9 h-9"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`} >
        <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div >
}

function Circle() {
    return <div className="w-1 h-1 rounded-full bg-slate-500">
    </div>
}

export default BlogCard

