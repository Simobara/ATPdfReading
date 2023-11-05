import React, { useState, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { Packer, Document as DocxJS, Paragraph } from 'docx';
import "./pdfViewer2.css";
import PdfDownload2 from './PdfDownload2/pdfDownload2';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const phoneNumberRegex = /\+?\d{1,4}?[-.\s]?\(?(\d{1,3}?)\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;

const PdfViewer2 = ({ filePdf2, fileWord2 }) => {
    const [wordBlob, setWordBlob] = useState("");

    const blobToString = async (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsText(blob);
        });
    };

    const extractPhoneNumberFromPdf = async (pdfFile) => {
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let combinedText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            combinedText += textContent.items.map(item => item.str).join(' ') + '\n\n';
        }

        const matches = combinedText.match(phoneNumberRegex);
        return matches ? matches[0] : null;
    };


    // async function createDocument(pdfText, wordText) {
    //     if (typeof wordText !== "string") {
    //         console.error("wordText non è una stringa:", wordText);
    //         return;
    //     }

    //     const matches = pdfText.match(phoneNumberRegex);
    //     const detectedPhoneNumber = matches ? matches[0] : null;
    //     console.log("Numero di telefono rilevato:", detectedPhoneNumber);

    //     const lines = wordText.split('\n');
    //     const paragraphs = lines.map(line => new Paragraph(line));

    //     // Trova l'indice del paragrafo "SEZIONEA" usando indexOf
    //     const indexSEZIONEA = lines.findIndex(line => line.indexOf('SEZIONEA') !== -1);

    //     if (indexSEZIONEA !== -1 && detectedPhoneNumber) {
    //         // Inserisci il numero di telefono come un nuovo paragrafo subito dopo "SEZIONEA"
    //         paragraphs.splice(indexSEZIONEA + 1, 0, new Paragraph(detectedPhoneNumber));
    //     } else {
    //         // Se "{{SEZIONEA}}" non viene trovato, sostituisci "{{SEZIONEA}}" con il numero di telefono
    //         wordText = wordText.replace('SEZIONEA', detectedPhoneNumber);
    //     }

    //     const doc = new DocxJS({
    //         title: 'Documento Modificato',
    //         creator: 'Me',
    //         description: 'Documento con numero di telefono aggiunto',
    //         sections: [{
    //             children: paragraphs,
    //         }]
    //     });
    //     const blob = await Packer.toBlob(doc);
    //     setWordBlob(blob);
    // }



    async function createDocument(pdfText, wordText) {
        if (typeof wordText !== "string") {
            console.error("wordText non è una stringa:", wordText);
            return;
        }

        const matches = pdfText.match(phoneNumberRegex);
        const detectedPhoneNumber = matches ? matches[0] : null;
        console.log("Numero di telefono rilevato:", detectedPhoneNumber);

        if (detectedPhoneNumber) {
            // Dividi il testo del documento Word in paragrafi
            const paragraphs = wordText.split('\n').map(line => new Paragraph(line));

            // Aggiungi il numero di telefono come nuovo paragrafo
            paragraphs.push(new Paragraph(detectedPhoneNumber));

            // Crea il documento Word
            const doc = new DocxJS({
                title: 'Documento Modificato',
                creator: 'Me',
                description: 'Documento con numero di telefono aggiunto',
                sections: [{
                    children: paragraphs,
                }]
            });

            const blob = await Packer.toBlob(doc);
            setWordBlob(blob);
        }
    }








    useEffect(() => {
        if (filePdf2) {
            extractPhoneNumberFromPdf(filePdf2).then(async pdfText => {
                const wordText = await blobToString(fileWord2);
                createDocument(pdfText, wordText).catch(error => {
                    console.error("Errore nella creazione del documento:", error);
                });
            });
        }
        // eslint-disable-next-line 
    }, [filePdf2]);

    return (
        <div className="border border-gray-300 p-2 shadow-md overflow-hidden" style={{ maxHeight: '100vh' }}>
            <PdfDownload2 wordBlob={wordBlob} />
        </div>
    );
}

export default PdfViewer2;
