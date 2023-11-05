import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PdfViewer from './PdfViewer/pdfViewerC';
import WordTemplate from './WordTemplate/wordTemplate';

const PdfDropZone = () => {
    const [isPdf, setIsPdf] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [showDocument, setShowDocument] = useState(false);
    const [createWordFormat, setCreateWordFormat] = useState(false);
    const [disabledVisDoc, setDIsabledVisDoc] = useState(false);
    const [disabledFormWord, setDIsabledFormWord] = useState(false);

    // Nuovi stati per gestire i documenti Word
    const [isWord, setIsWord] = useState(false);
    const [wordUploaded, setWordUploaded] = useState(false);
    // eslint-disable-next-line 
    const [selectedWord, setSelectedWord] = useState(null);
    // eslint-disable-next-line 
    const [uploadedWordDocument, setUploadedWordDocument] = useState(null);


    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        // Resetta lo stato dei bottoni e delle altre variabili correlate al PDF
        setShowDocument(false);
        setCreateWordFormat(false);
        setDIsabledVisDoc(false);
        setDIsabledFormWord(false);

        // Resetta lo stato del drag and drop di Word
        setIsWord(false);
        setWordUploaded(false);
        setSelectedWord(null);
        setCreateWordFormat(false);

        if (file && file.type !== 'application/pdf') {
            setIsPdf(true);
            setFileUploaded(false);
        } else {
            setIsPdf(false);
            setFileUploaded(true);
            setSelectedPdf(file);
        }
    }, []);



    const onDropWord = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const wordTypes = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
        if (file && !wordTypes.includes(file.type)) {
            setIsWord(true);
            setWordUploaded(false);
        } else {
            setIsWord(false);
            setWordUploaded(true);
            setSelectedWord(file);

            // Leggi il file come ArrayBuffer e salvalo nello stato
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedWordDocument(reader.result);
            };
            reader.readAsArrayBuffer(file);
        }
    }, []);




    const handleShowDocument = () => {
        setShowDocument(true);
        setDIsabledVisDoc(true);
        setDIsabledFormWord(true);
    }

    const handleCreateWordFormat = () => {
        setCreateWordFormat(true);
        setDIsabledFormWord(true);
        setDIsabledVisDoc(true);
    }

    const handleCloseSection = () => {
        setShowDocument(false);
        setCreateWordFormat(false);
        setDIsabledVisDoc(false);
        setDIsabledFormWord(false);

        // Resetta le variabili di stato per il file Word
        setIsWord(false);
        setWordUploaded(false);
        setSelectedWord(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'application/pdf'
    });

    const { getRootProps: getRootPropsWord, getInputProps: getInputPropsWord, isDragActive: isDragActiveWord } = useDropzone({
        onDrop: onDropWord,
        accept: "application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword"
    });

    return (
        <>
            <div className="flex flex-col items-center relative">
                <div
                    {...getRootProps()}
                    className="min-w-[50rem] border-dashed border-4 border-gray-500 p-10 h-20 flex flex-col justify-center items-center hover:bg-blue-400 bg-blue-800"
                >
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p className="text-white text-3xl font-bold">Trascina il file PDF qui...</p> :
                            <p className="text-white text-3xl font-bold">
                                Trascina il file PDF qui... o clicca per importarne uno
                            </p>
                    }
                </div>

                {isPdf &&
                    <p className="mt-2 text-red-600 text-center font-bold">IL FILE NON E' PDF, si accettano solo formati ".pdf"</p>
                }

                {fileUploaded &&
                    <>
                        <p className="mt-2 text-green-600 text-center font-bold ">File pdf caricato correttamente</p>
                        <div className="flex flex-col items-center mt-2 space-y-4">
                            <div className="flex space-x-2 mt-2">
                                <button onClick={handleShowDocument} className={`text-white px-4 py-2 rounded ${disabledVisDoc ? "bg-gray-300" : "bg-blue-800 hover:bg-blue-400"}`} disabled={disabledVisDoc || disabledFormWord}>Visualizza Documento</button>
                                <button onClick={handleCreateWordFormat} className={`text-white px-4 py-2 rounded ${disabledFormWord ? "bg-gray-300" : "bg-blue-800 hover:bg-blue-400"}`} disabled={disabledFormWord || disabledVisDoc}>Crea Formato Word</button>
                                <button onClick={handleCloseSection} className={`text-white px-4 py-2 rounded ${(disabledVisDoc || disabledFormWord) ? "bg-red-600 hover:bg-red-400" : "bg-gray-300"}`} disabled={!(disabledVisDoc || disabledFormWord)}>Chiudi sezione</button>
                            </div>
                        </div>
                    </>
                }

                {showDocument && !isPdf &&
                    <div className="max-h-[100rem] overflow-hidden border-black border-8 rounded-3xl p-4 mb-2 mt-4">
                        {selectedPdf && <PdfViewer file={selectedPdf} />}
                    </div>
                    //* IMP -------------------------------------------
                }

                {/* Sezione per il caricamento dei documenti Word */}
                {createWordFormat &&
                    <div className="flex flex-col items-center relative mt-4">
                        <div
                            {...getRootPropsWord()}
                            className="w-[30rem] border-dashed border-4 border-gray-500 p-10 h-60 flex flex-col justify-center items-center hover:bg-blue-400 bg-blue-800"
                        >
                            <input {...getInputPropsWord()} />
                            {
                                isDragActiveWord ?
                                    <p className="text-white text-lg font-bold">Trascina il template Word qui...</p> :
                                    <p className="text-white text-lg font-bold">
                                        Trascina il template Word qui....
                                    </p>
                            }
                        </div>
                        {isWord &&
                            <p className="mt-2 text-red-600 text-center font-bold">IL FILE NON E' WORD, si accettano solo formati ".docx"</p>
                        }
                        {wordUploaded &&
                            <>
                                <p className="mt-2 text-green-600 text-center font-bold">File Word caricato correttamente</p>
                                <div className="mt-4 flex justify-center">
                                    CREANDO IL WORD TEMPLATE,

                                    <WordTemplate filePdf={selectedPdf} fileWord={selectedWord} />
                                    {/* <button className="text-white bg-blue-800 hover:bg-blue-400 px-4 py-2 rounded">
                                        Vuoi scaricare il documento?

                                        DEVE ANDARE CON UN CLICK NELLA SEZIONE PDF VIEWER,

                                        FARE L ELABORAZIONE, E PROVVEDERE IL FORMATO WORD DI RIFERIMENTO
                                    </button> */}
                                </div>
                            </>
                        }
                    </div>
                }
            </div >
        </>
    )
}

export default PdfDropZone;








