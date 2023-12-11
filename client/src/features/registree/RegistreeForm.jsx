import React from "react";
import useRegistree from "../../hooks/useRegistree";
import { useFormik } from "formik";
import * as Yup from "yup";
const RegistreeForm = () => {
  const { showForm, setShowForm } = useRegistree();
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
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "", // Use "files" here
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      age: Yup.number().required("Required"),
      gender: Yup.string().required("required"),
    }),
    onSubmit: async (values) => {
      console.log(values.title);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("age", values.age);
      formData.append("email", values.email);
      formData.append("gender", values.gender);

      try {
        const response = await axiosWithAuth.post(`registree`, formData);
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
              First Name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName ? (
              <div style={{ color: "darkgreen" }}>{errors.firstName}</div>
            ) : null}

            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName ? (
              <div style={{ color: "darkgreen" }}>{errors.lastName}</div>
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
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Age
            </label>
            <input
              id="age"
              name="age"
              type="Number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.age}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <select
              id="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue="male">Choose your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistreeForm;
