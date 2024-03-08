

const BlogSkeleton = () => {
    return (
        <div>
            <div role="status" className="flex justify-center animate-pulse">

                <div className="flex flex-col p-4 gap-2 py-6 w-screen max-w-screen-md cursor-pointer">
                    <div className="flex text-sm gap-2">
                        <div className="flex flex-col justify-center">
                            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                        </div>
                        <div className="text-black">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                        </div>
                        <div className="  flex flex-col justify-center">
                            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

                        </div>
                        <div className="font-normal text-slate-500">
                            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

                        </div>
                    </div>
                    <div>
                        <div className="text-xl font-bold flex flex-col justify-center">
                            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

                        </div>
                        <div className="text-gray-500 flex flex-col justify-center">
                            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

                        </div>
                    </div>
                    <div className="text-sm text-slate-500 font-extralight">
                        <div className="h-2 bg-gray-200 rounded-full "></div>


                    </div>
                    <div className="border-b-2 pt-1"></div>
                </div>







                <span className="sr-only">Loading...</span>
            </div>
        </div>

    )
}

export default BlogSkeleton
