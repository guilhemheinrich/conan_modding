import jsonapi from './jsonApi/json_core'


export interface CSVTransformerOption {
    /**
     * JSON pointers to project upon
     */
    projection?: string[]
    numericNA?: string
    stringNA?: string
}

export class CSVTransformer<Shape> {
    data: any[] = []
    options: CSVTransformerOption
    // projection: string[]
    column_names_and_type: {[column: string]: 'numeric' | 'string'} = {}
    // column_names:Set<string> = new Set()
    constructor(options: CSVTransformerOption = {
        numericNA: '',
        stringNA: ''
    }) {
        this.options = options
    }

    push(...queuedData: Shape[]) {
        queuedData.forEach((shape) => {
            let item: any;
            if (this.options.projection) {
                let projection = jsonapi.project(shape, this.options.projection)
                item =  jsonapi.flatten(projection)
            } else {
                item = jsonapi.flatten(shape)
            }
            this.data.push(item)
            Object.keys(item).forEach((key) => {
                if(isNaN(Number(item[key]))) {
                    // console.log(String(item[key]))
                    this.column_names_and_type[key] = 'string'
                } else {
                    this.column_names_and_type[key] = 'numeric'
                }
            })
        })
    }

    get flat() {
        return this.data.map((shape) => {
            // if (this.options.projection) {
            //     let projection = jsonapi.project(shape, this.options.projection)
            //     return jsonapi.flatten(projection)
            // } else {
            // }
            return jsonapi.flatten(shape)
        })
    }

    get filledCsv() {
        let defaultLine: {[column: string]: string} = {}
        Object.keys(this.column_names_and_type).forEach((columnName) => {
            
            if (this.column_names_and_type[columnName] === 'numeric') {
                defaultLine[String(columnName)] = this.options.numericNA
            } else {
                defaultLine[String(columnName)] = this.options.stringNA
            }
        })

        return this.data.map((shape) => {
            // canot use object comprehension {...{}, ...{}} there
            // it is messing with '/' in keys

            // Also copy the content of the default line, not the pointer
            let final = JSON.parse(JSON.stringify(defaultLine))
            Object.keys(shape).forEach((pointer) => {
                final[pointer] = shape[pointer]
                // console.log('shape[pointer]')
                // console.log(shape[pointer])
            })
            return final
        })
    }
}
export default CSVTransformer
