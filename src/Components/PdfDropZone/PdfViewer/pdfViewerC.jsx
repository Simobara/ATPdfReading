import React, { useState, useEffect, useRef } from 'react';
//*CSS
import "./pdfViewer.css";
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
//*LIBRARIES
import { Document, Page } from 'react-pdf';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
//*COMPONENTS
import PdfControls from './PdfControls/pdfControls';
import PdfDownload from './PdfDownload/pdfDownload';
import LogViewer from './LogViewer/logViewer';
//*FUNCTIONS
import { createDocument } from './FCreateDoc/fCreateDocB';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfViewer = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.5);
    const [wordBlob, setWordBlob] = useState("");
    // const [originalTextState, setOriginalTextState] = useState("");
    const [textState, setTextState] = useState([]);
    const MAX_ZOOM = 2.5; // valore massimo dello zoom
    const MIN_ZOOM = 0.5; // valore minimo dello zoom
    const scrollContainerRef = useRef(null);
    const scrollLabelRef = useRef(null);
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    const extractTextFromPdf = async (pdfFile) => {
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let combinedText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            let lastItem = null;
            for (const item of textContent.items) {
                // Se lastItem esiste e l'attuale item è sulla stessa riga del lastItem, aggiungi uno spazio
                if (lastItem && Math.abs(lastItem.transform[5] - item.transform[5]) > 5) {
                    combinedText += '\n';
                }
                combinedText += item.str;
                lastItem = item;
            }
            combinedText += '\n'; // Nuova linea alla fine di ogni pagina
        }
        return combinedText;
    };
    useEffect(() => {
        if (file) {
            const processPdf = async () => {
                try {
                    const text = await extractTextFromPdf(file);
                    const { blob, sections } = await createDocument(text);
                    setWordBlob(blob);
                    // setOriginalTextState(originalText);
                    setTextState(sections);
                } catch (error) {
                    console.error("Errore nel processo PDF:", error);
                }
            };
            processPdf();
        }
        // eslint-disable-next-line
    }, [file]);

    return (
        <div className="border border-gray-300 shadow-md h-[120%] overflow-auto"
            style={{ maxHeight: '100vh' }} >
            <div className="overflow-auto" style={{ maxHeight: '20rem' }}>
                <LogViewer sections={textState} />
            </div>
            <div className="flex items-center justify-between sticky top-0 z-10 bg-white">
                <PdfControls
                    scale={scale}
                    MAX_ZOOM={MAX_ZOOM}
                    MIN_ZOOM={MIN_ZOOM}
                    setScale={setScale}
                    pageNumber={pageNumber}
                    numPages={numPages}
                    setPageNumber={setPageNumber}
                />
            </div>
            <div className="scroll-container">
                <div ref={scrollContainerRef}
                    className="items-start text-black pl-8 border-black border-2 overflow-auto custom-scrollbar"
                    style={{ maxHeight: '40vh' }} >
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} scale={scale} />
                    </Document>
                </div>
                <div ref={scrollLabelRef}
                    className="scroll-label hover:bg-blue-200">TEXT</div>
            </div>
            <PdfDownload wordBlob={wordBlob} />
        </div >
    );
}
export default PdfViewer;