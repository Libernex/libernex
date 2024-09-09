import PPT from "/public/file/PPT.svg";
import DOC from "/public/file/DOC.svg";
import DOCX from "/public/file/DOCX.svg";
import TXT from "/public/file/TXT.svg";
import PDF from "/public/file/PDF.svg";
import { StaticImageData } from "next/image";

const FileIconMapper: Record<string, StaticImageData> = {
  ppt: PPT,
  doc: DOC,
  docx: DOCX,
  txt: TXT,
  pdf: PDF,
};

export default FileIconMapper;
