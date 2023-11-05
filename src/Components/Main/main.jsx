import React from 'react';
import PdfDropZone from '../PdfDropZone/pdfDropZone';

const Main = () => {

    // const [isChecked, setChecked] = useState(false);

    return (
        <div className="max-h-screen flex flex-col justify-center items-center overflow-hidden border border-2 ">
            <h1 className="text-center text-4xl font-bold bg-blue-500 mt-4">
                {/* ARE YOU A ROBOT??

                <p>
                    <input type="checkbox" id="simpleCheckbox" className="mr-2" checked={isChecked} onChange={() => setChecked(!isChecked)} />
                    <label htmlFor="simpleCheckbox">Prima di inserire un PDF, dimmi cosa significa ...NDO?</label>
                </p> */}
            </h1>
            <PdfDropZone />
        </div >
    )
}

export default Main;
