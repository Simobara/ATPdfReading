import { Packer, Document as DocxJS, Paragraph } from 'docx';
import { getLogoUp, getLogoDown } from './FParagraphs/0GetsLogos/getLogos';
import { insertSeparatorsAndJson } from './FInsertSepAndJson/fInsertSepAndJson';
import { fixAndOrderSections } from './FFixAndOrderSections/fFixAndOrderSections';
import {
    personaInf,
    esperienzeLavorativ,
    istruzioneEFormazion,
    ulterioriInformazion,
    competenzeOrganizzativeEGestional,
    capacitaECompetenzeRelazional,
    capacitaECompetenzeTecnich,
    altreCapacit,
    patent,
    autorizzazioneDatiPersonal,
} from './FParagraphs/fParagraphs'; //*IMPORTANT----------------------------

//--------------------------------------------------------------------------MAIN
export const createDocument = async (text) => {

    const lines = text.split('\n');
    const allParagraphs = lines.map(line => new Paragraph(line));
    const originalText = lines.join(' ');
    const sections = insertSeparatorsAndJson(originalText); //*IMPORTANT-----
    const sect = fixAndOrderSections(sections);//*IMPORTANT------------------

    console.log("ORIGINAL TEXT", originalText)

    const section1 = sect[0];
    const sect1 = String(section1.content[0])
    const section2 = sect[1];
    const sect2 = String(section2.content[0])
    const section3 = sect[2];
    const sect3 = String(section3.content[0])
    const section4 = sect[3];
    const sect4 = String(section4.content[0])
    const section5 = sect[4];
    const sect5 = String(section5.content[0])
    const section6 = sect[5];
    const sect6 = String(section6.content[0])
    const section7 = sect[6];
    const sect7 = String(section7.content[0])
    const section8 = sect[7];
    const sect8 = String(section8.content[0])
    const section9 = sect[8];
    const sect9 = String(section9.content[0])
    const section10 = sect[9];
    const sect10 = String(section10.content[0])
    // console.log(sect1)

    // ---------------------------------------------------------------------FUNCTIONS RECALL
    const personaInfo = await personaInf(sect1, originalText);
    const esperienzeLavorative = await esperienzeLavorativ(sect2);
    const istruzioneEFormazione = await istruzioneEFormazion(sect3);
    const ulterioriInformazioni = await ulterioriInformazion(sect4);
    const competenzeOrganizzativeEGestionali = await competenzeOrganizzativeEGestional(sect5);
    const capacitaECompetenzeRelazionali = await capacitaECompetenzeRelazional(sect6);
    const capacitaECompetenzeTecniche = await capacitaECompetenzeTecnich(sect7);
    const altreCapacita = await altreCapacit(sect8);
    const patenti = await patent(sect9);
    const autorizzazioneDatiPersonali = await autorizzazioneDatiPersonal(sect10);
    //----------------------------------------------------------------------C Cesena OMPONENTS 
    const logoUp = await getLogoUp();
    const totParagraphs = [
        ...personaInfo,
        new Paragraph(" "),
        ...esperienzeLavorative,
        new Paragraph(" "),
        ...istruzioneEFormazione,
        new Paragraph(" "),
        ...ulterioriInformazioni,
        new Paragraph(" "),
        ...competenzeOrganizzativeEGestionali,
        ...capacitaECompetenzeRelazionali,
        new Paragraph(" "),
        ...capacitaECompetenzeTecniche,
        new Paragraph(" "),
        ...altreCapacita,
        new Paragraph(" "),
        ...patenti,
        new Paragraph(" "),
        ...autorizzazioneDatiPersonali,
        new Paragraph(" "),
        new Paragraph(" "),
        new Paragraph(" "),
        ...allParagraphs
    ];
    const logoDown = await getLogoDown();
    //----------------------------------------------------------------------DOC STRUCTURE
    const doc = new DocxJS({
        title: 'My Document',
        creator: 'Me',
        description: 'Sample document',
        sections: [{
            headers: {
                default: logoUp,
            },
            children: totParagraphs,
            footers: {
                default: logoDown,
            }
        }]
    });
    const blob = await Packer.toBlob(doc);
    return {
        blob,
        sections
        // originalText
    };
}
//---------------------------------------------------------------------------