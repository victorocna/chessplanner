import { i18n } from "../../../locale"
import fh from "../file-helpers"
import prepareUpload from "./prepare-upload"

const uploadFile = async (event, chips, options) => {
  let file = event.target.files[0]
  if (!file || !fh.isValidFile(file.name)) {
    throw new Error(i18n("Error! Unsupported file extension"))
  }

  let contents = ""
  if (fh.isCsv(file.name)) {
    try {
      contents = await fh.contentsFromCsv(file)
    } catch (err) {
      throw new Error(err)
    }
  }
  if (fh.isExcel(file.name)) {
    try {
      contents = await fh.contentsFromExcel(file)
    } catch (err) {
      throw new Error(err)
    }
  }

  // skip the first line in the loaded file
  const { skipFirst } = options
  if (skipFirst && contents.length >= 1) {
    contents.shift()
  }

  return prepareUpload(contents, chips)
}

export default uploadFile
