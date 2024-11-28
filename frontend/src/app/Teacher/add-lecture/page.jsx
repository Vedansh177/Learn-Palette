'use client';
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import useTeacherContext from '@/app/context/TeacherContext';



const lecture = () => {

  const {currentTeacher} = useTeacherContext();
  
  const lectureValidationSchema = Yup.object().shape({
    // email: Yup.string().email('Email is invalid').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    description: Yup.string().required('Description is required'),
    topic: Yup.string().required('Topic is required'),
    thumbnail: Yup.string().required('Thumbnail is required'),
   
  })

  const lectureForm = useFormik({
    initialValues: {
      subject: '',
      description: '',
      topic: '',
      thumbnail: ''
    },
    onSubmit: (values, { resetForm }) => {

      const res = fetch("http://localhost:5000/lecture/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
           "Content-Type": "application/json",
        "x-auth-token": currentTeacher.token,
       },
      })
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            toast.success("add successfully");
            action.resetForm();
          } else {
            toast.error("Something went wrong");
          }
        }).catch((err) => {
          console.log(err);
        });


    },
    validationSchema: lectureValidationSchema
  })


  return (
    <div>

      <>
        {/* source:https://codepen.io/owaiswiz/pen/jOPvEPB */}
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-6/10 p-6 sm:p-1">

              <div className="mt-12 flex flex-col items-center">
                <div className="w-full flex-1 mt-8">
                  {/* <div className="flex flex-col items-center">
                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                      <div className="bg-white p-2 rounded-full">
                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                          <path
                            d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                            fill="#4285f4"
                          />
                          <path
                            d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                            fill="#34a853"
                          />
                          <path
                            d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                            fill="#fbbc04"
                          />
                          <path
                            d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                            fill="#ea4335"
                          />
                        </svg>
                      </div>
                      <span className="ml-4">Sign In with Google</span>
                    </button>
                  </div> */}
                  {/* <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or sign In with Cartesian E-mail
                    </div>
                  </div> */}

                  <form onSubmit={lectureForm.handleSubmit}>
                    <div className="mx-auto max-w-xs">
<label htmlFor="">Subject</label>
                      {
                        lectureForm.touched.subject &&
                        <small className="text-red-500">{lectureForm.errors.subject}</small>
                      }
                      <input
                        className="w-full px-8 py-4 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder=" Subject"
                        id="subject"
                        onChange={lectureForm.handleChange}
                        value={lectureForm.values.subject}

                      />
                      {/* {
                        lectureForm.touched.lname &&
                        <small class="text-red-500">{lectureForm.errors.lname}</small>
                      }
                      <input
                        className="w-full px-8 py-4 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder=" Last Name"
                        id="lname"
                        onChange={lectureForm.handleChange}
                        value={lectureForm.values.lname}

                      /> */}
<label htmlFor="">Description</label>
                      {
                        lectureForm.touched.description &&
                        <small className="text-red-500">{lectureForm.errors.description}</small>
                      }
                      <input
                        className="w-full px-8 py-4 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Description"
                        id="description"
                        onChange={lectureForm.handleChange}
                        value={lectureForm.values.description}

                      />

<label htmlFor="">Topic</label>
                      {
                        lectureForm.touched.topic &&
                        <small className="text-red-500">{lectureForm.errors.topic}</small>
                      }
                      <input
                        className="w-full px-8 py-4 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Topic"
                        id="topic"
                        onChange={lectureForm.handleChange}
                        value={lectureForm.values.topic}

                      />

                      <div>
                      <label htmlFor="">
                          Thumbnail
                        </label>
                      {
                        lectureForm.touched.thumbnail &&
                        <small className="text-red-500">{lectureForm.errors.topic}</small>
                      }
                      <input
                        className="w-full px-8 py-4 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="file"
                        placeholder="Thumbnail"
                        id="thumbnail"
                        onChange={lectureForm.handleChange}
                        value={lectureForm.values.thumbnail}

                      />
                      </div>
                      
                      
                    

<button type="submit" className="mt-5 mb-5 tracking-wide font-semibold bg-pink-400 text-black-500 w-full py-4 rounded-lg hover:bg-purple -700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
<svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy={7} r={4} />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">Sign-In</span>
                  </button>

                    </div>
                  </form>

                </div>
              </div>
            </div>
            {/* <div className="flex-1 bg-green-100 text-center hidden lg:flex"> */}
              {/* <div
                className="m-12 xl:m-16 w-full h-auto bg-contain bg-center bg-no-repeat flex items-center justify-center"
              ><img src="/class.jpeg" alt="" /></div> */}
            {/* </div> */}
          </div>
        </div>
      </>

    </div>
  )
}

export default lecture