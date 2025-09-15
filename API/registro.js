import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import csvParser from 'csv-parser';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

function parseCSV(content) {
  return new Promise((resolve) => {
    const results = [];
    const stream = require('stream');
    const readable = new stream.Readable();
    readable._read = () => {};
    readable.push(content);
    readable.push(null);
    readable.pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results));
  });
}

function stringifyCSV(data) {
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => row[h]).join(','));
  return [headers.join(','), ...rows].join('\n');
}

export default async function handler(req, res) {
  const basePath = path.resolve('./data');

  const principalRaw = await readFile(`${basePath}/base_principal.csv`, 'utf8');
  const reemplazoRaw = await readFile(`${basePath}/base_reemplazo.csv`, 'utf8');
  const historialRaw = await readFile(`${basePath}/historial.csv`, 'utf8');

  const principal = await parseCSV(principalRaw);
  const reemplazo = await parseCSV(reemplazoRaw);
  const historial = await parseCSV(historialRaw);

  const registro = principal[Math.floor(Math.random() * principal.length)];
  const nuevoRegistro = reemplazo.shift();

  const actualizado = principal.map(r => r.id === registro.id ? nuevoRegistro : r);
  historial.push(registro);
  reemplazo.push(registro);

  await writeFile(`${basePath}/base_principal.csv`, stringifyCSV(actualizado));
  await writeFile(`${basePath}/base_reemplazo.csv`, stringifyCSV(reemplazo));
  await writeFile(`${basePath}/historial.csv`, stringifyCSV(historial));

  res.status(200).json(registro);
}