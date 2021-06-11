import JSZip from "jszip";
import iconv from "iconv-lite";
import XLSX from "xlsx";

type FileItem = ZipFile | XlsxFile

interface ZipFile {
  type: 'zip'
  name: string
  files: FileItem[]
}

interface XlsxFile {
  type: 'xlsx'
  name: string
  data: XlsxFileSheet[]
}

interface XlsxFileSheet {
  name: string
  data: string[][]
}

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

// function s2ab(s: any) {
//   const buf = new ArrayBuffer(s.length);
//   const view = new Uint8Array(buf);
//   for (let i = 0; i !== s.length; ++i) {
//     view[i] = s.charCodeAt(i) & 0xff;
//   }
//   return buf;
// }

export default async function save(source: FileItem[]) {
  const list = Array.isArray(source) ? source : [source]
  const result = []
  for (const item of list) {
    const res = await buildBuffer(item)
    console.log(res)
    result.push(res)
  }
  
  return result
}

async function buildBuffer(source: FileItem): Promise<{name: string, buffer: ArrayBuffer}> {
  let buffer = new ArrayBuffer(0)
  if (source.type === 'zip') {
    const zip = new JSZip();
    for (const item of source.files) {
      const {name, buffer} = await buildBuffer(item)
      zip.file(name, buffer)
    }

    buffer = await zip.generateAsync({
      type: "arraybuffer",
      encodeFileName: (n) => {
        return iconv.encode(n, "GBK").toString();
      },
    })

  } else if (source.type === 'xlsx') {
    const SheetNames = [];
    const Sheets: Record<string, XLSX.WorkSheet> = {};
    for (const { name, data } of source.data) {
      const wb = XLSX.utils.aoa_to_sheet(data);
      SheetNames.push(name);
      Sheets[name] = wb;
    }

    buffer = XLSX.write(
      { SheetNames, Sheets },
      { bookType: "xlsx", bookSST: false, type: "array" }
    )
  }

  return {
    name: source.name,
    buffer
  }
}

// Respond to message from parent thread
ctx.addEventListener("message", ({ data }) => {
  const { type, payload } = data
  console.time()
  if (type === 'create-file') {
    save(payload).then((data) => {
      console.timeEnd()
      ctx.postMessage({ type: 'create-file-success', payload: data }, data.map(item => item.buffer))
    }).finally(() => {
      (ctx as any)?.close()
    })
  }
});
