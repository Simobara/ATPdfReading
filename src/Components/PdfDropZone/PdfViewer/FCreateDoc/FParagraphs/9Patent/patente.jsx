import { Paragraph, TextRun } from 'docx';

const extractPatente = (origText) => {
    const keywordsItalian = [
        "abilitazione", "autorizzazione", "brevetto", "Carta di guida", "certificato", "concessione", "guida", "Licenza di guida", "licenza", "patente", "Permesso di guida", "permesso", "Tessera di guida"
    ];
    const keywordsEnglish = [
        "authorization", "certificate", "concession", "driving card", "driving licence", "driving license", "driving permit", "guide", "license", "patent", "permit"
    ];
    const macchinaSynonyms = [
        "macchina", "automobile", "auto", "autovettura", "veicolo", "berlina", "vettura", "car", "automobile", "vehicle", "motorcar", "auto", "machine"
    ];
    const combinedKeywords = [...keywordsItalian, ...keywordsEnglish];
    const targetWords = ["A", "B", "C", ...macchinaSynonyms];
    const regex = new RegExp(`\\b(${combinedKeywords.join("|")})\\b(?:\\W+(?:\\w+)?){0,5}?\\W+(${targetWords.join("|")})\\b`, "i");
    const match = origText.match(regex);
    if (match && macchinaSynonyms.includes(match[2].toLowerCase())) {
        return "B";
    }
    return match ? match[2] : null;
};



// ------------------------------------------------------------OUTPUT
export const getPat = async (text) => {
    const patente = await extractPatente(text);
    if (!patente) {
        return null;
    }
    return new Paragraph({
        alignment: "left",
        children: [new TextRun(`Patente: ${patente}`)]
    });
};
