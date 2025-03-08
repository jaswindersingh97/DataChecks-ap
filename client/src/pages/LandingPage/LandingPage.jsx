import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-sky-300 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">Welcome to Bloggi</h1>
      <p className="text-lg mb-6">Share your thoughts with the world</p>
      <div className="space-x-4">
        <Link to={"/signin"} className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">Sign In</Link>
        <Link to={"/register"} className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600">Register</Link>
        <Link to={"/posts"} className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600">View Posts</Link>
      </div>
    </div>
  );
}
