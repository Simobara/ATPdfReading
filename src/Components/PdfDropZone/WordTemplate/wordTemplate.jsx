import React from 'react'
import PdfViewer2 from './PdfViewer2/pdfViewer2'


const WordTemplate = ({ filePdf, fileWord }) => {

    return (
        <div>
            <PdfViewer2 filePdf2={filePdf} fileWord2={fileWord} />
        </div>
    )
}

export default WordTemplate
