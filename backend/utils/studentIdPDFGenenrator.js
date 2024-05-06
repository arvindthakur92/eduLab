import  puppeteer from 'puppeteer';
import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const studentIDTemplate = './template/student-id.html';
const containerTemplate = './template/pdf-container.html';

const studentIdPDFGenenrator = async (replacableData) => {
    
    const outerContent = fs.readFileSync(containerTemplate, 'utf8');
    const browser = await puppeteer.launch();
    let tempContent = '';
    const page = await browser.newPage();
    for (const i in replacableData) {
        let idContent = fs.readFileSync(studentIDTemplate, 'utf8');
        const transformedData = transformData(replacableData[i]);
        for (const [key, value] of Object.entries(transformedData)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            idContent = idContent.replace(regex, value);
        }
        tempContent = tempContent+ '<br/>' +idContent;
    }
    const finalContent = outerContent.replace( new RegExp(`{{BODY}}`, 'g'), tempContent);
    await page.setContent(finalContent, { waitUntil: 'networkidle0' });
    const pdfPath = path.join(__dirname, '../generated-pdf/student-id.pdf');
    await page.pdf({ path: pdfPath, format: 'A4', overwrite: true }).catch(error => console.error('PDF generation error:', error));
    await browser.close();
    return pdfPath;
}

function transformData (data) {
    const transformedData = Object.keys(data).reduce((acc, key) => {
        acc['FULL_NAME'] = `${data['firstName']} ${data['lastName']}`;
        acc['STUDENT_ID'] = data['id_number'];
        acc['AGE'] = data['age'];
        acc['GENDER'] = data['gender'];
        acc['EMAIL_ID'] = data['email'];
        acc['BLOOD_GRP'] = data['blood_group'];
        acc['ISSUED_ON'] = data['issued_on'];
        const imageFilePath = `./public/images/${data['id_number']}.jpg`;
        acc['PHOTO_URL'] = `${fs.readFileSync(imageFilePath).toString('base64')}`;
        return acc;
      }, {});
      return transformedData;
}
export default studentIdPDFGenenrator;