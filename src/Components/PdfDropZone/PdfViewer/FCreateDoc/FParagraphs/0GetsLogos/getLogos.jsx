import { Paragraph, ImageRun, Header, Footer } from 'docx';
import ATLogoUp from '../../../../../../Assets/ATLogoUp.png';
import ATLogoDown from '../../../../../../Assets/ATLogoDown.png';

// -----------------------------------------------------------------GET LOGO UP
export const getLogoUp = async () => {
    const imageParagraph = new Paragraph({
        alignment: "right",
        children: [
            new ImageRun({
                data: await (await fetch(ATLogoUp)).arrayBuffer(),
                //Il primo await: Questo attende che la funzione fetch(ATLogoDown) sia completata. La funzione fetch restituisce una Promise che risolve con l'oggetto Response una volta che la richiesta HTTP è completata. Quindi, await fetch(ATLogoDown) restituirà un oggetto Response.
                //Il secondo await: Dopo aver ottenuto l'oggetto Response, si chiama il metodo arrayBuffer() su di esso per ottenere i dati binari della risposta sotto forma di ArrayBuffer. Anche il metodo arrayBuffer() restituisce una Promise, che è il motivo per cui ce bisogno di un altro await per risolverla.
                transformation: { width: 250, height: 100 }
            })
        ]
    });
    return new Header({ children: [imageParagraph] });
}
// ------------------------------------------------------------------GET LOGO DOWN
export const getLogoDown = async () => {
    const imageParagraph = new Paragraph({
        alignment: "left",
        children: [
            new ImageRun({
                data: await (await fetch(ATLogoDown)).arrayBuffer(),
                transformation: { width: 250, height: 100 }
            })
        ]
    });
    return new Footer({ children: [imageParagraph] });
}
// ------------------------------------------------------------------



