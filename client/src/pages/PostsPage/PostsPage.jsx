import React, { useEffect, useState, useRef, Fragment } from "react";
import Modal from "../../components/Modal/Modal";
import Api from "../../Api/Api";
import imagePlaceholder from "./../../assets/image.png";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useUser } from "../../context/userContext";
import PostForm from "../../components/PostForm/PostForm";
import { toast } from "react-toastify";
function PostsPage() {
  const {user} = useUser()
  const dummy = [1, 2, 3];
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  const [modalForm,setModalForm] = useState(null);
  const [modal, setModal] = useState(false);
  const [stopLoadMore,setStopLoadMore] = useState(false);
 

  const CreatePost = async(values) =>{
    try {

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    if (values.photo) {
      formData.append("file", values.photo);
    }

    const response =await Api({
      endpoint:"/posts",
      method:"post",
      includeToken:true,
      headers:{ "Content-Type": "multipart/form-data" },
      data:formData
    })
    if(response.status == 201 || 200){
      setData((prevData)=>([response.data,...prevData]))
      setModalForm(null)
      setModal(false)
      toast.success("post created successfully")
    }
    else{
      toast.error("something went wrong");
    }
    
  }
    catch(error){
      console.log(error)
      toast.error("something went wrong")
    } 
  }
  const openCreateModal = (e) =>{
    e.stopPropagation();
    setModalForm(
    <>
      <h1>Create Post</h1>
      <PostForm onSubmit={CreatePost}/>
    </>  
    )
    setModal(true)
  }
  const updatePost = (id) => async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      if (values.photo) {
        formData.append("file", values.photo);
      }
  
      const response = await Api({
        endpoint: `/posts/${id}`,
        method: "put",
        includeToken: true,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      });
      if(response.status== 200){
        setData((prevData) => [
          response.data,
          ...prevData.filter((item) => item.id !== id),
        ]);
        setModalForm(null);
        setModal(false);
        toast.success("post updated successfully")
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  const openEditModal = ({id, title, content, photo}) => (e) => {
    e.stopPropagation();
    setModalForm(
      <>
        <h1>Edit Post</h1>
        <PostForm onSubmit={updatePost(id)} initialValues={{ title, content, photo }} />
      </>
    );
    setModal(true);
  };
  const deleteitem = async(id) =>{
    const response = await Api({
      endpoint:`/posts/${id}`,
      method:'delete',
      includeToken:true
    })
    if(response.status == 200){
      setData((prevData)=>(prevData.filter((item)=>(item.id != id))))
      toast.success("item deleted successfully")
      setModalForm(null)
      setModal(false)
    }
    else{
      toast.error("Something went wrong")
    }
  }
  const openDeleteModal = (id) =>{
    setModalForm(
      <form onSubmit={(e)=>{
        e.preventDefault()
        deleteitem(id)}} className="p-4 bg-white rounded-lg shadow-lg space-y-4">
        <h1 className="text-xl font-semibold text-gray-800">Delete</h1>
        <p className="text-gray-600">Are you sure you want to delete this item?</p>
        <div className="flex justify-end gap-4">
          <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Yes
          </button>
          <button onClick={()=>{
            setModalForm(null)
            setModal(false)
          }} type="button" className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
            Cancel
          </button>
        </div>
      </form>
    )
    setModal(true)
  }
  
  const fetchData = async (currentSkip) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await Api({
        endpoint: `/posts?skip=${currentSkip}&limit=10`,
        method: "get",
      });
      if(response.data.length==0){
        setStopLoadMore(true)
      }
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

  return (
    <>
      <section className="bg-white p-10 pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
            <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
            Our Blogs
            </h2>
            <SearchBar/>
            <br/>
          <button 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer" 
            onClick={openCreateModal}>
          Add new Post</button>

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
                  id={item.id}
                  key={item.id}
                  userId={user.id}
                  created_by={item.created_by}
                  openEditModal={openEditModal}
                  openDeleteModal={openDeleteModal}
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
          {modalForm}
          </Modal>
            <div className="w-full text-center">
          {!stopLoadMore && <button 
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  dark:focus:ring-blue-800 cursor-pointer ${loading && 'bg-gray-500 hover:bg-gray-500 cursor-progress'}`} 
          onClick={fetchMore} 
          disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>}
          </div>
        </div>
      </section>
    </>
  );
}



const BlogCard = ({ image, date, CardTitle, CardDescription ,onClick,  author ,userId,created_by ,id,openEditModal,openDeleteModal}) => {
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
            <div >
              {date && (
                <span className="bg-sky-600 mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                  {formatDate(date)}
                </span>
              )}
              {(userId== created_by) &&
              <span className='self-end'>
              <button onClick={openEditModal({title:CardTitle,id:id,content:CardDescription,photo:image})} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer">
                Edit
              </button>
              <button onClick={(e)=>{
                e.stopPropagation()
                openDeleteModal(id)}} type="button" className="px-4 py-2 text-sm text-red-500 font-medium  bg-white border rounded-e-lg  border-gray-200 hover:bg-gray-100 cursor-pointer ">
                Delete
              </button>
              </span>  }
            </div>
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
