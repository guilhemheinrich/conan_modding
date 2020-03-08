import * as path from 'path'
import * as fs from 'fs-extra'
import commander from 'commander'


import { Item, ItemSelector } from './src/struct/Item'
// import filterItem from './src/selectOnItemTable'
import writeCSV from './src/writeCSV'
import human_weapons from './src/rework/human_weapons'
import human_bow from './src/rework/human_bowAndAmmunitions'




const csv_options = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    useTextFile: true,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};

// import itemTable from './ItemTable_original.json'

// let itemDict: { [reference: string]: Item } = {};
// (<Item[]>itemTable).forEach((item: Item) => {
//     itemDict[item.RowName] = item
// })
// let reworked_weapons = human_weapons((<Item[]>itemTable), itemDict)
// writeCSV(reworked_weapons, ['./ItemSubTable/reworked_melee_human_weapon.csv'], csv_options)

// let reworked_bows = human_bow((<Item[]>itemTable), itemDict)
// writeCSV(reworked_bows, ['./ItemSubTable/reworked_bow_human_weapon.csv'], csv_options)

import monsterTable from './MonsterStatTable_original.json'
import hp_curve from './src/rework/monster_hp_curve'
const capAndFactor = [
    {
        factor: 1,
        hp_step: 0
    },
    {
        factor: 0.5,
        hp_step: 700
    },
    {
        factor: 0.3,
        hp_step: 2000
    }, 
    {
        factor: 0.1,
        hp_step: 5000
    }
]
let monster_hp = hp_curve(monsterTable, capAndFactor)
writeCSV(monster_hp, ['./ItemSubTable/monster_hp.csv'], csv_options)
// writeCSV(human_armor, ['./ItemSubTable/human_armor.csv'], csv_options)
// writeCSV(human_weapon, ['./ItemSubTable/human_weapon.csv'], csv_options)
// writeCSV(monster_weapon, ['./ItemSubTable/monster_weapon.csv'], csv_options)



// let human_armor = filterItem(<Item[]>itemTable, HumanArmorSelector)
// let human_weapon = filterItem(<Item[]>itemTable, HumanWeaponSelector_noBow)
// let monster_weapon = filterItem(<Item[]>itemTable, MonsterWeaponSelector)

// let human_weapon_resume_table = human_weapon.map((human_weapon) => {
//     return {
//         "damage": human_weapon.DamageHealthLight_OnHit,
//         "index": human_weapon.RowName
//     }
// })


// let sorted_weapons = human_weapon_resume_table.sort((a, b) => a.damage - b.damage)
// let sorted_weapons_length = sorted_weapons.length
// let minimum: { damage: number, index: string } = sorted_weapons[0]
// let rank2: { damage: number, index: string } = sorted_weapons[1]
// let rank3: { damage: number, index: string } = sorted_weapons[2]
// let maximum: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 1]
// let rankMinus1: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 2]
// let rankMinus2: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 3]
//     console.log(`
//     ______________________________________________________________________________________
//     ______________________________________________________________________________________

//     minimum: ${minimum.damage} 
// ${itemDict[minimum.index].Name}

//     rank2: ${rank2.damage} 
// ${itemDict[rank2.index].Name}

//     rank3: ${rank3.damage} 
// ${itemDict[rank3.index].Name}

//     maximum: ${maximum.damage} 
// ${itemDict[maximum.index].Name}

//     rankMinus1: ${rankMinus1.damage} 
// ${itemDict[rankMinus1.index].Name}

//     rankMinus2: ${rankMinus2.damage} 
// ${itemDict[rankMinus2.index].Name}
// ______________________________________________________________________________________
// ______________________________________________________________________________________
//     `)

// // for (let i = 1; i < 6; i++) {
// //     let classification: Array<{damage: number, indexes: string[]}> = Object.keys(<{[damage: number] : string[]}>human_weapon_resume_per_tier[i]).map((damage_key) => {
// //         return {damage: Number(damage_key), indexes: <string[]>human_weapon_resume_per_tier[i][damage_key]}
// //     })

// //     classification = classification.sort((a, b) => a.damage - b.damage)
// //     let class_length = classification.length
// //     let minimum: {damage: number, indexes: string[]} = classification[0]
// //     let rank2: {damage: number, indexes: string[]} = classification[1]
// //     let rank3: {damage: number, indexes: string[]} = classification[2]
// //     let maximum: {damage: number, indexes: string[]} = classification[class_length - 1]
// //     let rankMinus1: {damage: number, indexes: string[]} = classification[class_length - 2]
// //     let rankMinus2: {damage: number, indexes: string[]} = classification[class_length - 3]
// //     let median: {damage: number, indexes: string[]} = classification[Math.trunc(class_length * 0.5)]
// //     let firstTiertile: {damage: number, indexes: string[]} = classification[Math.trunc(class_length * 0.33)]
// //     let secondTiertile: {damage: number, indexes: string[]} = classification[Math.trunc(class_length * 0.66)]
// //     console.log(`
// //     ______________________________________________________________________________________
// //     ______________________________________________________________________________________

// //     Tier ${i}
// //     minimum: ${minimum.damage} 
// // ${minimum.indexes.map((index) => itemDict[index].Name).join('\n')}

// //     rank2: ${rank2.damage} 
// // ${rank2.indexes.map((index) => itemDict[index].Name).join('\n')}

// //     rank3: ${rank3.damage} 
// // ${rank3.indexes.map((index) => itemDict[index].Name).join('\n')}

// //     maximum: ${maximum.damage} 
// // ${maximum.indexes.map((index) => itemDict[index].Name).join('\n')}

// //     rankMinus1: ${rankMinus1.damage} 
// // ${rankMinus1.indexes.map((index) => itemDict[index].Name).join('\n')}

// //     rankMinus2: ${rankMinus2.damage} 
// // ${rankMinus2.indexes.map((index) => itemDict[index].Name).join('\n')}
// //     `)

// // }

// // median: ${median.damage} 
// // ${minimum.indexes.map((index) => itemDict[index].ShortDesc).join('\n')}

// // firstTiertile: ${firstTiertile.damage} 
// // ${minimum.indexes.map((index) => itemDict[index].ShortDesc).join('\n')}

// // secondTiertile: ${secondTiertile.damage} 
// // ${minimum.indexes.map((index) => itemDict[index].ShortDesc).join('\n')}

// // fs.ensureFileSync(['./ItemSubTable/human_weapon_resume.csv'])
// // writeCSV(human_weapon_resume_table, ['./ItemSubTable/human_weapon_resume.csv'], csv_options)

// // On fait chuter 60% de la différence avec la meilleur arme
// let thales_delta = 0.6
// let modifiedHumanWeapon = human_weapon.map((human_weapon) => {
//     let new_weapon = { ...human_weapon };
//     let increment = (maximum.damage - human_weapon.DamageHealthLight_OnHit)  * thales_delta + (/Exceptional/.test(human_weapon.Name) ? 1 : 0) + (/Flawless/.test(human_weapon.Name) ? 2 : 0)
//     new_weapon.DamageHealthHeavy_OnHit = Math.round(human_weapon.DamageHealthHeavy_OnHit + increment) 
//     new_weapon.DamageHealthLight_OnHit = Math.round(human_weapon.DamageHealthLight_OnHit + increment)
//     return new_weapon
// })

