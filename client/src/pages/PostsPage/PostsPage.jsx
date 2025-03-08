import React, { useEffect, useState, useRef } from "react";
import Modal from "../../components/Modal/Modal";
import Api from "../../Api/Api";
import imagePlaceholder from "./../../assets/image.png";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

function PostsPage() {
  const dummy = [1, 2, 3];
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  const fetchData = async (currentSkip) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await Api({
        endpoint: `/posts?skip=${currentSkip}&limit=10`,
        method: "get",
      });
      setData((prevData) => [...prevData, ...response.data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchData(skip);
  }, [skip]);

  const fetchMore = () => {
    setSkip((prevSkip) => prevSkip + 10); // Trigger re-fetch via useEffect
  };

  const [modal, setModal] = useState(false);
  return (
    <>
      <section className="bg-white p-10 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
            <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
            Our Blogs
            </h2>
            <SearchBar/>
          </div>
          <div className="-mx-4 p-5 flex flex-wrap">
            {data?.length > 0 ? (
              data.map((item, index) => (
                <BlogCard
                  onClick={() => navigate(`${item.id}`)}
                  author={item.author}
                  image={item.image_url}
                  date={item.created_at}
                  CardTitle={item.title}
                  CardDescription={item.content}
                  key={item.id}
                />
              ))
            ) : (
              <>
                {dummy.map((item) => (
                  <Skeleton key={item} />
                ))}
              </>
            )}
          </div>

          <Modal isOpen={modal} onClose={() => setModal(false)}>
            Inside Modal
          </Modal>

          <button 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer" 
            onClick={() => setModal((prev) => !prev)}>
          open modal</button>

          <button 
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer ${loading && 'bg-gray-500 hover:bg-gray-500 cursor-progress'}`} 
          onClick={fetchMore} 
          disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </section>
    </>
  );
}



const BlogCard = ({ image, date, CardTitle, CardDescription ,onClick,  author }) => {
    const formatDate = (dateString) => {
      if (!dateString) return "Unknown date";
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(dateString));
    };
  
    const truncatedDescription = CardDescription?.length > 100 
      ? `${CardDescription.slice(0, 100)}...` 
      : CardDescription;

    const truncatedTitle = CardTitle?.length > 100 
      ? `${CardTitle.slice(0, 100)}...` 
      : CardTitle;
    
    return (
      <>
        <div onClick={onClick} className="w-full px-10 md:w-1/2 lg:w-1/3">
          <div title={CardTitle} className="mb-10 rounded-xl cursor-pointer  hover:bg-gray-200 p-4  w-full">
            <div className="mb-8 overflow-hidden rounded">
              <img src={image ? image : imagePlaceholder} alt="" className="w-full h-60" />
            </div>
            <div>
              {date && (
                <span className="bg-sky-600 mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                  {formatDate(date)}
                </span>
              )}
              <div className='flex gap-2 items-center'>
                <h1 className='mb-1 text-l font-medium text-gray-900 dark:text-white'>{author?.name}</h1>
                <h1 className='mb-1 text-l font-medium text-sky-900 underline dark:text-white'>{author?.email}</h1>

              </div>
              <h3>
                <a
                  href="/#"
                  className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                >
                  {truncatedTitle}
                </a>
              </h3>
              <p className="text-base text-body-color dark:text-dark-6">
                {truncatedDescription}
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
        <div className="mb-10 rounded-xl p-4 w-full animate-pulse hover:bg-gray-200">
          {/* Image Placeholder */}
          <img src={imagePlaceholder} alt="" className="w-full cover" />
          <br/>
          {/* <div className="mb-8 overflow-hidden rounded bg-gray-300 h-48 w-full dark:bg-gray-700"></div> */}
  
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
