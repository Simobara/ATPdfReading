import React from 'react'

const PdfDownload2 = ({ wordBlob }) => {
    return (
        <>
            <div>
                {wordBlob &&
                    <a
                        href={URL.createObjectURL(wordBlob)}
                        download="documento.docx"
                        className="btn-download"
                    >
                        Scarica il file Word
                    </a>
                }
            </div>
        </>
    )
}

export default PdfDownload2
