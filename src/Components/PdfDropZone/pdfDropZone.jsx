import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PdfViewer from './PdfViewer/pdfViewer';

// import ImmagineCurva from "../../Assets/ImmagineCurvaRoma.png"

const PdfDropZone = () => {
    const [isPdf, setIsPdf] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        // Prendi il primo file
        const file = acceptedFiles[0];

        if (file && file.type !== 'application/pdf') {
            setIsPdf(true);
            setFileUploaded(false);
        } else {
            setIsPdf(false);
            setFileUploaded(true);
            setSelectedPdf(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'application/pdf'
    });

    return (
        <>
            <div className="flex flex-col items-center relative">
                <div
                    {...getRootProps()}
                    className="min-w-[50rem] border-dashed border-4 border-gray-500 p-10 mt-10 h-60 flex flex-col justify-start items-center hover:bg-gray-100 bg-blue-200"
                // style={{ backgroundImage: `url(${ImmagineCurva})` }}
                >
                    <input {...getInputProps()} />
                    {
                        isDragActive ? <p className="text-black text-3xl font-bold">Trascina il file PDF qui...</p> :
                            <p className="text-black text-3xl font-bold " >
                                Trascina il file PDF qui... o clicca per importarne uno
                                {/* MAGICA MANU ... Trascina un file In curva SUD. */}
                            </p>
                    }

                </div>
                {isPdf && <p className="mt-4 text-red-600">Il file inserito NON E' un PDF. Per favore inserisci un file PDF.</p>}
                {fileUploaded && !isPdf &&
                    <>
                        <p className="mt-4 text-green-600">File pdf caricato correttamente</p>
                        <div className="max-h-[50rem] overflow-hidden border-red-700 border-8 rounded-3xl p-4 mb-2">
                            {selectedPdf && <PdfViewer file={selectedPdf} />}
                        </div>
                    </>
                }
            </div >
        </>
    )
}

export default PdfDropZone;




