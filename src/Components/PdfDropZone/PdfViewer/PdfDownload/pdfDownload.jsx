import React from 'react';

const PdfDownload = ({ wordBlob }) => {
    return (
        <>
            <div className="bg-black"></div>
            {
                wordBlob && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold shadow mt-2 p-2">
                        <a
                            href={URL.createObjectURL(wordBlob)}
                            download="documento.docx"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Vuoi scaricare il pdf nel modello Word?
                        </a>
                    </button>
                )
            }
        </>
    );
}

export default PdfDownload;

