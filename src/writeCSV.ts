import { ExportToCsv, Options } from 'export-to-csv';
import CSVTransformer from './CSVTransformer'
import * as path from 'path';
import * as fs from 'fs-extra'
export function writeCSV(data_table: {}[],  folder_path: string[], csv_options?: Options) {
    let transformer = new CSVTransformer()
    transformer.push(...data_table)
    let csvExporter = new ExportToCsv({ ...csv_options });
    fs.ensureFileSync(path.resolve(...folder_path))
    fs.writeFileSync(path.resolve(...folder_path), csvExporter.generateCsv(transformer.filledCsv, true), 'utf-8')
}

export default writeCSV