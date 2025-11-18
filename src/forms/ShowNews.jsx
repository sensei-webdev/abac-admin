import React from "react";

const ShowNews = ({ data, close }) => {
  return (
    <div className="bg-white p-6 w-[600px] rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">News Details</h2>

      <img
        src={data.image}
        alt="news"
        className="w-full h-48 object-cover rounded mb-4"
      />

      <p className="font-bold text-gray-800 text-lg mb-2">{data.title}</p>

      <p className="text-gray-600 mb-3">{data.shortDescription}</p>

      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{data.content}</p>

      <p className="text-sm text-gray-500 mb-1">
        Published: {new Date(data.datePublished).toLocaleDateString()}
      </p>

      {data.sourceLink && (
        <a
          href={data.sourceLink}
          className="text-blue-600 underline text-sm"
          target="_blank"
        >
          Read Source
        </a>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={close}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowNews;
