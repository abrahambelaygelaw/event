import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import axiosWithAuth from "../../Utility/axiosWithAuth";
import { toast, ToastContainer } from "react-toastify";

const RegistreeForm = () => {
  const { id } = useParams();
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href);
    console.log(id);
    console.log(currentURL);
  }, []);

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
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const formData = {
        name: values.name,
        email: values.email,
        event: id,
        link: currentURL,
      };

      try {
        const response = await axiosWithAuth.post(`registree`, formData);
        console.log("Form submitted successfully.", response.data);
        toast.success("Registred successfully", {
          position: "top-right",
          autoClose: 2000, // Time in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Form submission failed.", error);
        toast.error("Registration failed", {
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
  return (
    <div className={` md:mx-auto  p-3 max-w-2xl  rounded-lg`}>
      <ToastContainer />
      <div className="flex items-start justify-between p-4 mb-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Register
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-3 ">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full Name
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          {touched.name && errors.name ? (
            <div style={{ color: "darkgreen" }}>{errors.name}</div>
          ) : null}

          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {touched.email && errors.email ? (
            <div style={{ color: "darkgreen" }}>{errors.email}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primaryHover dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistreeForm;
