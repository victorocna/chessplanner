import path from "path"
import XLSX from "xlsx"

const isCsv = (filename) => {
  return path.extname(filename) === ".csv"
}
const isExcel = (filename) => {
  return [".xls", ".xlsx"].includes(path.extname(filename))
}
const isValidFile = (filename) => {
  return [".csv", ".xls", ".xlsx"].includes(path.extname(filename))
}
const contentsFromCsv = (file) => {
  const reader = new FileReader()
  reader.readAsText(file)

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reject("Unknown error! Cannot read file")
    }
    reader.onload = (event) => {
      resolve(event.target.result.split("\n"))
    }
  })
}
const contentsFromExcel = (file) => {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reject("Unknown error! Cannot read file")
    }
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result)
      try {
        const workbook = XLSX.read(data, { type: "array" })
        const target_sheet = workbook.Workbook.Sheets[0].name
        const worksheet = workbook.Sheets[target_sheet]

        resolve(XLSX.utils.sheet_to_csv(worksheet).split("\n"))
      } catch (err) {
        reject("Unknown error! Cannot read file")
      }
    }
  })
}

export default {
  isCsv: isCsv,
  isExcel: isExcel,
  isValidFile: isValidFile,
  contentsFromCsv: contentsFromCsv,
  contentsFromExcel: contentsFromExcel,
}
