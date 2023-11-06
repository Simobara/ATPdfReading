import { Paragraph, TextRun } from 'docx';

const extractIstEFor = (origText) => {
    // const keywords = ["telefono", "tel", "cell", "mobile"];
    // const keywordRegex = new RegExp(`(${keywords.join("|")})[:\\s]*`, "i");
    // const matchKeyword = origText.match(keywordRegex);// Estrai potenziale numero dopo la parola chiave
    // if (matchKeyword) {
    //     const startIdx = matchKeyword.index + matchKeyword[0].length;
    //     const slicedText = origText.slice(startIdx);
    //     const italianMobileWithPrefix = slicedText.match(/\+39[\s-]*(\d[\s-]*){10}/);// Verifica la presenza di +39 e success verifica se ci sono 10 cifre
    //     if (italianMobileWithPrefix) {
    //         const cleanedNumber = italianMobileWithPrefix[0].replace(/[\s-]/g, '');// Rimuovi spazi e trattini, quindi combina con +39
    //         return cleanedNumber;
    //     }
    //     const italianMobileWithoutPrefix = slicedText.match(/(\d[\s-]*){10}/);// Se non trova +39, verifica se ci sono solo 10 cifre
    //     if (italianMobileWithoutPrefix) {
    //         const cleanedNumber = italianMobileWithoutPrefix[0].replace(/[\s-]/g, '');// Rimuovi spazi e trattini
    //         return cleanedNumber;
    //     }
    // }
    return null;
}



export const getIstEFor = async (origText) => {
    let istEFor = await extractIstEFor(origText);
    const headingRun = new TextRun({
        text: "ISTRUZIONE E FORMAZIONE:\n",
        bold: true,
    });
    const emptyLineRun = new TextRun({
        text: "\n",
        break: 2,
    });
    const educationAndTrainingRun = new TextRun({
        text: istEFor ? istEFor : " / ",
    });
    return new Paragraph({
        alignment: "left",
        children: [headingRun, emptyLineRun, educationAndTrainingRun],
    });
}
