import { useEffect, useState } from "react";
import axios from "axios";
import { be_url } from "./Gate";
const token = localStorage.getItem("token");

interface Course {
  name: string;
  description: string;
  price: number;
  imgUrl: string;
}

export default function User() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseRes = await axios.get(`${be_url}/courses`, {
          headers: {
            token,
          },
        });
        console.log(courseRes);
        setAllCourses([...courseRes.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-black  py-8 ">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Available Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {allCourses.map((course, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
            >
              <img
                src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt={course.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {course.name}
                </h2>
                <p className="mt-2 text-gray-600">{course.description}</p>
                <p className="mt-4 text-lg font-bold text-yellow-600">
                  ${course.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
