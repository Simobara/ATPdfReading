import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { Packer, Document as DocxJS, Paragraph } from 'docx';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfViewer = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.5);
    const [wordBlob, setWordBlob] = useState("");

    const MAX_ZOOM = 2.5; // valore massimo dello zoom
    const MIN_ZOOM = 0.5; // valore minimo dello zoom

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const extractTextFromPdf = async (pdfFile) => {
        const arrayBuffer = await pdfFile.arrayBuffer();

        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let combinedText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            combinedText += textContent.items.map(item => item.str).join(' ') + '\n\n';
        }

        return combinedText;
    };

    async function createDocument(text) {
        const paragraphs = text.split('\n').map(line => new Paragraph(line));
        const doc = new DocxJS({
            title: 'My Document',
            creator: 'Me',
            description: 'Sample document',
            sections: [{
                children: paragraphs,
            }]
        });

        const blob = await Packer.toBlob(doc);
        setWordBlob(blob);
    }

    useEffect(() => {
        if (file) {
            extractTextFromPdf(file).then(text => {
                createDocument(text).catch(error => {
                    console.error("Errore nella creazione del documento:", error);
                });
            });
        }
        // eslint-disable-next-line
    }, [file]);

    return (
        <div className="border border-gray-300 p-4 shadow-md overflow-hidden" style={{ maxHeight: '100vh' }}>
            <div className="flex items-center justify-between mb-4 sticky top-0 z-10 bg-white p-2">
                <div>
                    <button
                        className={`text-white px-4 py-2 m-2 ${scale >= MAX_ZOOM ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'}`}
                        onClick={() => setScale(prevScale => Math.min(prevScale + 0.5, MAX_ZOOM))}
                        disabled={scale >= MAX_ZOOM}
                    >
                        <i className="fas fa-search-plus mr-2"></i>
                        Zoom In
                    </button>
                    <button
                        className={`text-white px-4 py-2 m-2 ${scale <= MIN_ZOOM ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'}`}
                        onClick={() => setScale(prevScale => Math.max(prevScale - 0.5, MIN_ZOOM))}
                        disabled={scale <= MIN_ZOOM}
                    >
                        <i className="fas fa-search-minus mr-2"></i>
                        Zoom Out
                    </button>

                </div>
                <p className="font-extrabold text-3xl">Page {pageNumber} of {numPages}</p>

                <div>
                    <button
                        className="bg-red-500 text-white px-4 py-2 m-2 disabled:opacity-50"
                        onClick={() => setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1))}
                        disabled={pageNumber <= 1}
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Previous
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 m-2 disabled:opacity-50"
                        onClick={() => setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages))}
                        disabled={pageNumber >= numPages}
                    >
                        Next

                        <i className="fas fa-arrow-right ml-2"></i>
                    </button>

                </div>
            </div>

            <div className="flex flex-col items-start text-black pl-8 border-black border-2 overflow-auto" style={{ maxHeight: '50vh' }}>
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} scale={scale} />
                </Document>
            </div>

            <div className="my-4 bg-black h-1"></div>

            {
                wordBlob && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-16 rounded-lg shadow">
                        <a href={URL.createObjectURL(wordBlob)} download="documento.docx">
                            Vuoi scaricare il file in formato Word?
                        </a>
                    </button>
                )
            }
        </div >
    );
}

export default PdfViewer;









