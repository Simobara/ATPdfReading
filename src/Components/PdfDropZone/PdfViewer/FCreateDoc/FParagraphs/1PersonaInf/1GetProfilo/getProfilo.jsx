import { Paragraph, TextRun } from 'docx';
// import nlp from 'compromise';

// const extractProfiloWithNLP = (origText) => {
//     const doc = nlp(origText);
//     const numbers = doc.numbers().out('array'); // estrae tutti i numeri
//     for (let number of numbers) {
//         let cleanedNumber = number.replace(/[\s-]/g, '');
//         if (cleanedNumber.length >= 5 && cleanedNumber.length <= 15) {
//             return cleanedNumber;
//         }
//     }
//     return null;
// }


const extractProfilo = (origText) => {
    // const keywords = [
    //     "apparecchio", "canale", "cell", "cell phone", "cellulare", "chiamata", "cifra", "codice", "collegamento", "connessione", "contatto", "fisso", "landline", "linea", "mobile", "mobile phone", "numero", "numero di telefono", "Phone", "phone number", "rapporto", "richiamo", "smartphone", "tel", "telefono", "telefono fisso", "telefonata"
    // ];
    // const keywordRegex = new RegExp(`(${keywords.join("|")})[:\\s]*`, "i");
    // const matchKeyword = origText.match(keywordRegex); // Estrai potenziale numero dopo la parola chiave
    // if (matchKeyword) {
    //     const startIdx = matchKeyword.index + matchKeyword[0].length;
    //     const slicedText = origText.slice(startIdx);
    //     // Cercare un `+` (con possibili spazi) seguito da altri possibili spazi e poi da una serie di numeri che, una volta "ripuliti", sono tra 5 e 15 cifre
    //     const numberWithPrefix = slicedText.match(/(\+\s*)?(\d[\s-]*){5,15}/);
    //     if (numberWithPrefix) {
    //         const cleanedNumber = numberWithPrefix[0].replace(/[\s-]/g, '');
    //         // Verifica se il numero "ripulito" ha una lunghezza tra 5 e 15 cifre
    //         if (cleanedNumber.length >= 5 && cleanedNumber.length <= 15) {
    //             return cleanedNumber; // Questo manterrà il `+` nel numero finale se presente
    //         }
    //     }
    // }
    return null;
}



export const getPro = async (origText) => {
    let profilo = await extractProfilo(origText);
    // if (!phoneNumber) {
    //     phoneNumber = extractProfiloWithNLP(origText);
    // }
    return new Paragraph({
        alignment: "left",
        children: [
            new TextRun(`Profilo: ${profilo ? profilo : " / "}`)
        ]
    });
}
