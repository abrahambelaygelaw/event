import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useEvent from "../../hooks/useEvent";
import axiosWithAuth from "../../Utility/axiosWithAuth";
const EventForm = () => {
  const { showForm, setShowForm } = useEvent();
  const {
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleReset,
    handleChange,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      title: "",
      location: "",
      description: "",
      date: "",
      files: [], // Use "files" here
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      date: Yup.string().required("Required"),
      files: Yup.array().min(1, "Atlist one file is required"),
    }),
    onSubmit: async (values) => {
      console.log(values.title);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("location", values.location);
      formData.append("date", values.date);
      for (let i = 0; i < values.files.length; i++) {
        formData.append("files", values.files[i]);
      }
      try {
        const response = await axiosWithAuth.post(`event`, formData);
        console.log("Form submitted successfully.", response.data);
        // window.location.reload()
        // addedSuccussfully();
      } catch (error) {
        console.error("Form submission failed.", error);
      }
    },
  });

  return (
    <div
      className={`w-full  inset-0 
      ${showForm ? "" : "hidden"} 
      fixed  bg-black bg-opacity-60 z-10`}
    >
      <div
        className={`m-3 md:mx-auto mt-6 p-3 max-w-2xl dark:bg-gray-800 bg-white rounded-lg`}
      >
        <div className="flex items-start justify-between p-4 mb-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add New Event
          </h3>
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
            }}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 ">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Event Title
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="title"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            {touched.title && errors.title ? (
              <div style={{ color: "darkgreen" }}>{errors.title}</div>
            ) : null}

            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="location"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="location"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
            />
            {touched.location && errors.location ? (
              <div style={{ color: "darkgreen" }}>{errors.location}</div>
            ) : null}

            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {touched.description && errors.description ? (
              <div style={{ color: "darkgreen" }}>{errors.description}</div>
            ) : null}
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date{" "}
            </label>
            <input
              id="date"
              type="date"
              name="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label htmlFor="files">Pictures</label>
            <input
              type="file"
              id="files"
              name="files"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              onChange={(event) => {
                const filesArray = Array.from(event.currentTarget.files);
                setFieldValue("files", filesArray);
              }}
              onBlur={handleBlur}
              multiple
            />
            {touched.files && errors.files ? (
              <div style={{ color: "darkgreen" }}>{errors.files}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
