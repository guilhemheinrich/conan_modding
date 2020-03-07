import {ItemSelector, Item, selector} from './struct/Item'


export function filterItemTable(itemTable: Item[], selector: ItemSelector) {
    // Build the function the fuilter will operate through
    let finalSelector : ItemSelector = <ItemSelector>{}
    Object.keys(selector).forEach((key) => {
        if (selector[key] === undefined) {
            finalSelector[key] = (input: number | string ) => {
                return true
            }
        }
        if (typeof selector[key] === 'function') {
            finalSelector[key] =  selector[key]
        } else if (Array.isArray(selector[key])) {
            finalSelector[key] = (input: number | string ) => {
                return (<Array<string | number>>selector[key]).includes(input)
            }
        } else {
            finalSelector[key] = (input: number | string ) => {
                return input === selector[key]
            }
        }
    })
    return itemTable.filter((item: Item) => {
        return Object.keys(finalSelector).reduce((acc, key) => {
            return acc && finalSelector[key](item[key])
        }, true)
    })
}

export default filterItemTable