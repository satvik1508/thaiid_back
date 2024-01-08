import vision from "@google-cloud/vision";
import { cleanData } from "./cleanocr.js";

const CREDENTIALS = JSON.parse(
  JSON.stringify({
   
  })
);

const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};

const client = new vision.ImageAnnotatorClient(CONFIG);
function removeThaiWords(sentence) {
  const thaiCharacterRange = /[\u0E00-\u0E7F]/;

  const words = sentence.split(/\s+/);

  const nonThaiWords = words.filter((word) => !thaiCharacterRange.test(word));

  const modifiedSentence = nonThaiWords.join(" ");

  return modifiedSentence;
}
export const ocrData = async (path) => {
  let [result] = await client.textDetection(path);
  let arrString = result.fullTextAnnotation.text;
  let cleanText = removeThaiWords(arrString);
  // console.log(cleanText);
  let data = cleanData(cleanText);
  return data;
};



