import filterItem from '../selectOnItemTable'
import { Item, ItemSelector } from '../struct/Item'

const HumanWeaponSelector_Bow: ItemSelector = {
    "GUICategory": "Weapon",
    "WeaponArcheType": "TwoHanded_Ranged",
    "WeaponType": "Bow",
    "Icon":
        (icon: string) => {
            return icon !== "/Game/UI/Textures/Icons/icon_weapon_animal_DEV.icon_weapon_animal_DEV" && !(/icon_legendary/.test(icon))
        },
}


export function humanBowWeapons(itemTable: Item[], itemDict: { [reference: string]: Item }) {

    let selection = filterItem(<Item[]>itemTable, HumanWeaponSelector_Bow)

    let human_weapon_resume_table = selection.map((human_weapon) => {
        return {
            "damage": human_weapon.DamageHealthLight_OnHit,
            "index": human_weapon.RowName
        }
    })
    // Get all ammunitions, without physical damage > 1 (blunt arrow, specialist...)
    let ammos_indexes : Set<number> = new Set()
    selection.forEach((bow_type) => {
        bow_type.CompatableAmmunitions.forEach((ammo_index) => ammos_indexes.add(ammo_index))
    })
    let ammos = Array.from(ammos_indexes).map((index) => itemDict[String(index)]).filter((item) => item.DamageHealthLight_OnHit > 1)
    let sorted_weapons = human_weapon_resume_table.sort((a, b) => a.damage - b.damage)
    let sorted_weapons_length = sorted_weapons.length
    let minimum: { damage: number, index: string } = sorted_weapons[0]
    console.log('lowest bow : ' + minimum.damage)
    // let rank2: { damage: number, index: string } = sorted_weapons[1]
    // let rank3: { damage: number, index: string } = sorted_weapons[2]
    let maximum: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 1]
    // let rankMinus1: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 2]
    // let rankMinus2: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 3]
    let thales_delta = 0.6
    let modifiedHumanWeapon = [...selection, ...ammos].map((human_weapon) => {
        let new_weapon = { ...human_weapon };
        let increment = (maximum.damage - human_weapon.DamageHealthLight_OnHit) * thales_delta + (/Exceptional/.test(human_weapon.Name) ? 1 : 0) + (/Flawless/.test(human_weapon.Name) ? 2 : 0)
        new_weapon.DamageHealthHeavy_OnHit = Math.round(human_weapon.DamageHealthHeavy_OnHit + increment)
        new_weapon.DamageHealthLight_OnHit = Math.round(human_weapon.DamageHealthLight_OnHit + increment)
        return new_weapon
    })

    return modifiedHumanWeapon
}

export default humanBowWeapons