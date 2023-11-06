import { Paragraph, TextRun } from 'docx';
import { createTable } from './FCreazioneTabella/fCreazioneTabella';


export const recoverDatas = () => {         //*4 dentro - fuori
    const dummyData = ['Italiano', 'C2', 'C2', 'C2', 'C2', 'C2', 'C2', 'C2'];
    return dummyData;
};

const extractAltCap = () => {               //*2 dentro
    const skillsInTable = createTable();    //*3 fuori - 5* dentro
    return skillsInTable;
};

const fHeading = (headingText) => {
    return new Paragraph({
        children: [
            new TextRun({
                text: headingText.toUpperCase(),
                bold: true,
            })
        ]
    });
}

const fMadLingHeading = (madreLinguaDatas) => {
    return new Paragraph({
        children: [
            new TextRun({
                text: madreLinguaDatas
            })
        ]
    });
}

const fSpaceParagraphs = (space) => {
    return new Paragraph({
        children: [
            new TextRun({
                text: space,
            })
        ]
    })
}



// ------------------------------------------------------------OUTPUT
export const getAltCap = async (text) => {
    const heading = fHeading("Ulteriori informazioni:");
    const spacePar = fSpaceParagraphs(" ")
    const madLingHeading = fMadLingHeading("Madre Lingua:")
    const table = await extractAltCap(text); //TABELLA CREATA
    let elements = [heading, spacePar, madLingHeading, spacePar, table];
    return elements;
};

//Lingua Madre: 
// Altre Lingue: (tabella)
// Comprensione Parlato Scritto Ascolto Lettura Interazione Orale Produzione orale
// A1 A1 A1 A1 A1 A1 A1
// METRO DI MISURA:
// Suffiente A1 A2,
// discreto B1,
// intermedio buono B2,
// ottimo C1,
// eccellente C2. 


