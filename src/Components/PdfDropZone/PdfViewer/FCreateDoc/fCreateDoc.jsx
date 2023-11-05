import {
    Packer, Document as DocxJS,
    // Paragraph
} from 'docx';
import { getLogoUp, getLogoDown } from './FParagraphs/0FGets/fGets';
import {
    // personaInf,
    // esperienzeLavorativ,
    // istruzioneEFormazion,
    // ulterioriInformazion,
    // competenzeOrganizzativeEGestional,
    // capacitaECompetenzeRelazional,
    // capacitaECompetenzeTecnich,
    // altreCapacit,
    // patent,
    // autorizzazioneDatiPersonal,
    allParagraph
} from './FParagraphs/fParagraphs';


// --------------------------------------------------------------------- MAIN
export async function createDocument(text) {

    // ----------------------------------------------------------------- FUNZIONI CHE RECALL FUNZIONI
    // const personaInfo = await personaInf(text);
    // const esperienzeLavorative = await esperienzeLavorativ();
    // const istruzioneEFormazione = await istruzioneEFormazion();
    // const ulterioriInformazioni = await ulterioriInformazion();
    // const competenzeOrganizzativeEGestionali = await competenzeOrganizzativeEGestional();
    // const capacitaECompetenzeRelazionali = await capacitaECompetenzeRelazional();
    // const capacitaECompetenzeTecniche = await capacitaECompetenzeTecnich();
    // const altreCapacita = await altreCapacit();
    // const patenti = await patent();
    // const autorizzazioneDatiPersonali = await autorizzazioneDatiPersonal();
    const allParagraphs = await allParagraph(text);

    // -----------------------------------------------------------------CREAZIONE DI TUTTI I PARAGRAFI
    const logoUp = await getLogoUp();

    const totParagraphs = [
        // ...personaInfo,
        // ...esperienzeLavorative,
        // ...istruzioneEFormazione,
        // ...ulterioriInformazioni,
        // ...competenzeOrganizzativeEGestionali,
        // ...capacitaECompetenzeRelazionali,
        // ...capacitaECompetenzeTecniche,
        // ...altreCapacita,
        // ...patenti,
        // ...autorizzazioneDatiPersonali,
        // new Paragraph(" "),
        ...allParagraphs
    ];

    const logoDown = await getLogoDown();
    // ------------------------------------------------------------------ CREAZIONE -DOCX- (FILE EXPORT))
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
    return blob;
}
// ---------------------------------------------------------------------