import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { Packer, Document as DocxJS, Paragraph } from 'docx';
import "./pdfViewer.css";
import PdfControls from './PdfControls/pdfControls';
import PdfDownload from './PdfDownload/pdfDownload';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfViewer = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.5);
    const [wordBlob, setWordBlob] = useState("");

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


    async function createDocument(text) {
        // Array delle parole che vuoi contrassegnare
        const wordsToHighlight = ["experience", "FRONTEND", "BACKEND"];

        // Sostituisci ogni parola nell'array con la versione contrassegnata
        wordsToHighlight.forEach(word => {
            const regex = new RegExp(word, "gi");
            text = text.replace(regex, `{{ ${word} }}`);
        });

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



    // useEffect(() => {
    //     const scrollContainer = scrollContainerRef.current;
    //     const scrollLabel = scrollLabelRef.current;
    //     const handleScroll = () => {
    //         const scrollbarPosition = scrollContainer.scrollTop;
    //         const scrollbarHeight = scrollContainer.clientHeight;
    //         const labelPosition = scrollLabel.offsetTop;
    //         const labelHeight = scrollLabel.clientHeight;
    //         if (scrollbarPosition + scrollbarHeight > labelPosition && scrollbarPosition < labelPosition + labelHeight) {
    //             scrollLabel.style.color = 'black'; // Cambia questo da 'red' a 'white'
    //         } else {
    //             scrollLabel.style.color = 'black'; // Cambia questo da 'black' a 'whitesmoke' come nel tuo CSS
    //         }
    //     };
    //     scrollContainer.addEventListener('scroll', handleScroll);
    //     return () => { // Cleanup
    //         scrollContainer.removeEventListener('scroll', handleScroll);
    //     }
    // }, []);

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
        <div className="border border-gray-300 p-2 shadow-md overflow-hidden" style={{ maxHeight: '100vh' }}>
            <div className="flex items-center justify-between  sticky top-0 z-10 bg-white p-2">
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
                <div ref={scrollContainerRef} className="items-start text-black pl-8 border-black border-2 overflow-auto custom-scrollbar" style={{ maxHeight: '50vh' }}>
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} scale={scale} />
                    </Document>
                </div>
                <div ref={scrollLabelRef} className="scroll-label hover:bg-blue-200">TEXT</div>
            </div>
            <PdfDownload wordBlob={wordBlob} />
        </div >
    );
}

export default PdfViewer;