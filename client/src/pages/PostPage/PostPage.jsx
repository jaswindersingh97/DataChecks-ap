import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../../Api/Api';
import imagePlaceholder from './../../assets/Image-not-found.png'

function PostPage() {
    const {postId} = useParams();
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState([]);
    const fetchData = async() =>{
      const response = await Api({
        endpoint:`/posts/${postId}`,
        method:'get',
      })
      setData(response.data)
      setLoading(false)
    }    
    useEffect(()=>{
      fetchData();
    },[])
  return (
   <> {
    loading ? <BlogPostSkeleton/>:
      <BlogPost image={data.image_url} date={data.created_at} PostedBy={data.author} CardDescription={data.content} CardTitle={data.title} />
    }</>
  )
}

const BlogPost = ({ image, CardTitle, date, PostedBy, CardDescription }) => {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Post Image */}
        <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
          <img src={image} alt={CardTitle} className="w-full h-full object-cover" />
        </div>
  
        {/* Post Content */}
        <article>
          {/* Title & Meta */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{CardTitle}</h1>
          <div className="flex items-center space-x-3 mb-6">
            {/* <img src={Avatar} alt={PostedBy} className="w-10 h-10 rounded-full" /> */}
            <div>
              <p className="text-gray-700 dark:text-gray-300">{PostedBy?.name}</p>
              <p className="text-gray-700 dark:text-gray-300">{PostedBy?.email}</p>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>
  
          {/* Blog Content */}
          <div className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed space-y-6">
            {CardDescription?.split("\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </article>
  
        <>{/* Related Posts */}
        {/* <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Another Great Blog Post</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Some brief description...</p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">More Insights on Blogging</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Quick summary of this post...</p>
            </div>
          </div>
        </section> */}
        </>
      </div>
    );
  };
  
const BlogPostSkeleton = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
        {/* Skeleton Image */}
        <div className="w-full h-64 md:h-96 rounded-lg bg-gray-300 dark:bg-gray-700 mb-6"></div>
  
        {/* Skeleton Content */}
        <article>
          {/* Title & Meta */}
          <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="flex items-center space-x-3 mb-6">
            <div>
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
              <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
              <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
  
          {/* Skeleton Blog Content */}
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </article>
      </div>
    );
  };
  

export default PostPage
