import { Paragraph, TextRun } from 'docx';

const extractEspLav = (origText) => {
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



export const getEspLav = async (origText) => {
    const espLav = extractEspLav(origText);
    return new Paragraph({
        alignment: "left",
        children: [
            new TextRun(`Esperienze Lavorative: ${espLav ? espLav : " / "}`)
        ]
    });
}