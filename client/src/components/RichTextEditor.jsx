// RichTextEditor.js

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ content, setContent }) => {
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  return (
    <div className="my-8 p-4 bg-background text-white rounded shadow-md">
      <h2 className="text-xl mb-4">Write Event Description</h2>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={(value) => {
          setContent({ target: { name: "description", value } });
        }}
        formats={formats}
        modules={modules}
        name="description"
        placeholder="Start writing your article..."
        className="text-white h-[300px] w-full"
      />
    </div>
  );
};

export default RichTextEditor;
