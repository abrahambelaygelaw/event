import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

import axiosWithAuth from "../../Utility/axiosWithAuth";
import RichTextEditor from "../../components/RichTextEditor";
const EventForm = () => {
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
        toast.success("Event Saved successfully", {
          position: "top-right",
          autoClose: 2000, // Time in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Form submission failed.", error);
        toast.error("Form submission failed", {
          position: "top-right",
          autoClose: 2000, // Time in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
  });
  console.log(values);
  return (
    <div
      className={`w-full
        bg-background z-10`}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      <div className={`m-3 md:mx-auto mt-0 p-3 max-w-2xl   rounded-lg`}>
        <div className="flex items-start justify-between p-4 mb-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add New Event
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 ">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Event title
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
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
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

            <label htmlFor="date">Date </label>
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
          <div className="">
            <RichTextEditor
              content={values.description}
              setContent={handleChange}
            />
          </div>
          <button
            type="submit"
            className="mt-6 text-white bg-primary hover:bg-primaryHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark: bg-primarydark:hover:hover:bg-primaryHover  dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
