import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal';
import Api from '../../Api/Api';
function PostsPage() {
  const dummy = [1,2,3];
  const [datas,setData] = useState([]);
  const fetchData = async() =>{
    const response = await Api({
      endpoint:""
    })
  }
  useEffect(()=>{

  },[])
    const data = [
        {
        date:"Dec 22, 2023",
        CardTitle:"Meet AutoManage, the best AI management tools",
        CardDescription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        image:"https://i.ibb.co/Cnwd4q6/image-01.jpg",
        PostedBy:"Jaswinder Singh",
        Avatar:"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
        },
        // {
        //     date:"Dec 22, 2023",
        //     CardTitle:"Meet AutoManage, the best AI management tools",
        //     CardDescription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        //     image:"https://i.ibb.co/Cnwd4q6/image-01.jpg"
        // },
        // {
        //     date:"Dec 22, 2023",
        //     CardTitle:"Meet AutoManage, the best AI management tools",
        //     CardDescription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        //     image:"https://i.ibb.co/Cnwd4q6/image-01.jpg"
        // },
]
    const [modal,setModal] =useState(false);
  return (
    <>
      <section className="bg-white p-10 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container ">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="mb-2 block text-lg font-semibold text-primary">
                  Our Blogs
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
                  Our Recent News
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

          <div className="-mx-4 p-5 flex flex-wrap">
          {data?.length>0 ?data.map((item,index)=>(
            <BlogCard PostedBy={item.PostedBy} Avatar={item.Avatar} image={item.image} date={item.date} CardTitle={item.CardTitle} CardDescription={item.CardDescription} key={index}/>
          )):(
            <>
            {dummy.map((item)=>(
              <Skeleton key={item}/>
            ))}</>
          )
          }
          </div>
        <button onClick={()=>setModal((prev)=>(!prev))}>openmodal</button>
        <Modal isOpen={modal} onClose={()=>setModal(false)} >
            InsideModal
        </Modal>
        </div>
      </section>
    </>
  );
};



const BlogCard = ({ image, date, CardTitle, CardDescription , Avatar, PostedBy }) => {
    return (
      <>
        <div className="w-full  px-10 md:w-1/2 lg:w-1/3">
          <div className="mb-10 rounded-xl hover:bg-sky-200 p-4  w-full">
            <div className="mb-8 overflow-hidden rounded">
              <img src={image} alt="" className="w-full" />
            </div>
            <div>
              {date && (
                <span className="bg-sky-600 mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                  {date}
                </span>
              )}
              <div className='flex gap-2 items-center'>
                <img src={Avatar} alt='profilePhoto' className='w-8 h-8 mb-3 rounded-full shadow-lg'/>
                <h1 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{PostedBy}</h1>
              </div>
              <h3>
                <a
                  href="/#"
                  className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                >
                  {CardTitle}
                </a>
              </h3>
              <p className="text-base text-body-color dark:text-dark-6">
                {CardDescription}
              </p>
            </div>
          </div>
        </div>
      </>   
    )
  }

  const Skeleton = () => {
    return (
      <div className="w-full px-10 md:w-1/2 lg:w-1/3">
        <div className="mb-10 rounded-xl p-4 w-full animate-pulse hover:bg-sky-200">
          {/* Image Placeholder */}
          <div className="mb-8 overflow-hidden rounded bg-gray-300 h-48 w-full dark:bg-gray-700"></div>
  
          <div>
            {/* Date Placeholder */}
            <div className="bg-gray-300 rounded px-4 py-1 text-xs font-semibold mb-5 w-24 h-5 dark:bg-gray-700"></div>
  
            {/* Avatar & Name Placeholder */}
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-5 bg-gray-300 rounded w-1/3 dark:bg-gray-700"></div>
            </div>
  
            {/* Title Placeholder */}
            <div className="mt-3 h-6 bg-gray-300 rounded w-full dark:bg-gray-700"></div>
  
            {/* Description Placeholder */}
            <div className="mt-2 h-4 bg-gray-300 rounded w-full dark:bg-gray-700"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded w-5/6 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  };
  
    
export default PostsPage
