// PdfControls.js
import React from 'react';

const PdfControls = ({ scale, MAX_ZOOM, MIN_ZOOM, setScale, pageNumber, numPages, setPageNumber }) => {
    return (
        <>
            <div>
                <button
                    className={`text-white px-4 py-2 m-2 ${scale >= MAX_ZOOM ? 'bg-gray-300 ' : 'bg-blue-500  hover:bg-blue-700'}`}
                    onClick={() => setScale(prevScale => Math.min(prevScale + 0.5, MAX_ZOOM))}
                    disabled={scale >= MAX_ZOOM}
                >
                    <i className="fas fa-search-plus mr-2"></i>
                    Zoom In
                </button>
                <span className=""> Zoom: {scale} </span>
                <button
                    className={`text-white px-4 py-2 m-2 ${scale <= MIN_ZOOM ? 'bg-gray-300 ' : 'bg-blue-500  hover:bg-blue-700'}`}
                    onClick={() => setScale(prevScale => Math.max(prevScale - 0.5, MIN_ZOOM))}
                    disabled={scale <= MIN_ZOOM}
                >
                    <i className="fas fa-search-minus mr-2"></i>
                    Zoom Out
                </button>
            </div>

            <div>
                <button
                    className={` text-white px-4 py-2 m-2 disabled:opacity-50 ${pageNumber <= 1 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"}`}
                    onClick={() => setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1))}
                    disabled={pageNumber <= 1}
                >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Previous
                </button>
                <span className="font-extrabold text-3xl">Pagina {pageNumber} di {numPages}</span>
                <button
                    className={` text-white px-4 py-2 m-2 disabled:opacity-50 ${pageNumber >= numPages ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"}`}
                    onClick={() => setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages))}
                    disabled={pageNumber >= numPages}
                >
                    Next
                    <i className="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </>
    );
};

export default PdfControls;
