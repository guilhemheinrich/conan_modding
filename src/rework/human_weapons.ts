import filterItem from '../selectOnItemTable'
import {Item, ItemSelector} from '../struct/Item'

const HumanWeaponSelector_noBow: ItemSelector = {
    "GUICategory": "Weapon",
    "WeaponType" : (weapon_type) => weapon_type !== "Bow",
    "DamageHealthLight_OnHit": (damage: number) => {
        return damage > 10
    },
    "WeaponArcheType": (weapon_archetype) => weapon_archetype !== "Ammunition",
    "HarvestDamage": (damage: number) => {
        return damage === 0
    },
    "Icon":
        (icon: string) => {
            return icon !== "/Game/UI/Textures/Icons/icon_weapon_animal_DEV.icon_weapon_animal_DEV" && !(/icon_legendary/.test(icon))
        },
}

export function humanMeleeWeapons(itemTable: Item[], itemDict: { [reference: string]: Item }) {

    let human_weapon_noBow = filterItem(<Item[]>itemTable, HumanWeaponSelector_noBow)
    
    let human_weapon_resume_table = human_weapon_noBow.map((human_weapon) => {
        return {
            "damage": human_weapon.DamageHealthLight_OnHit,
            "index": human_weapon.RowName
        }
    })
    let sorted_weapons = human_weapon_resume_table.sort((a, b) => a.damage - b.damage)
let sorted_weapons_length = sorted_weapons.length
// let minimum: { damage: number, index: string } = sorted_weapons[0]
// let rank2: { damage: number, index: string } = sorted_weapons[1]
// let rank3: { damage: number, index: string } = sorted_weapons[2]
let maximum: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 1]
// let rankMinus1: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 2]
// let rankMinus2: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 3]
    let thales_delta = 0.6
    let modifiedHumanWeapon = human_weapon_noBow.map((human_weapon) => {
        let new_weapon = { ...human_weapon };
        let increment = (maximum.damage - human_weapon.DamageHealthLight_OnHit)  * thales_delta + (/Exceptional/.test(human_weapon.Name) ? 1 : 0) + (/Flawless/.test(human_weapon.Name) ? 2 : 0)
        new_weapon.DamageHealthHeavy_OnHit = Math.round(human_weapon.DamageHealthHeavy_OnHit + increment) 
        new_weapon.DamageHealthLight_OnHit = Math.round(human_weapon.DamageHealthLight_OnHit + increment)
        return new_weapon
    })
    
    return modifiedHumanWeapon
}

export default humanMeleeWeapons