import React from 'react'
import { useParams } from 'react-router-dom'
function PostPage() {
    const {postId} = useParams();
    const post = {
        date:"Dec 22, 2023",
        CardTitle:"Meet AutoManage, the best AI management tools",
        CardDescription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image:"https://i.ibb.co/Cnwd4q6/image-01.jpg",
        PostedBy:"Jaswinder Singh",
        Avatar:"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
        };
  return (
    <BlogPost image={post.image} date={post.date} PostedBy={post.PostedBy} Avatar={post.Avatar} CardDescription={post.CardDescription} CardTitle={post.CardTitle} />
  )
}

const BlogPost = ({ image, CardTitle, date, PostedBy, Avatar, CardDescription }) => {
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
            <img src={Avatar} alt={PostedBy} className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">{PostedBy}</p>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>
  
          {/* Blog Content */}
          <div className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed space-y-6">
            {CardDescription.split("\n").map((para, index) => (
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
  

export default PostPage
