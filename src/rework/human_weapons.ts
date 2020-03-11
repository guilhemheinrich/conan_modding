import filterItem from '../selectOnItemTable'
import { Item, ItemSelector } from '../struct/Item'

const HumanWeaponSelector_noBow: ItemSelector = {
    "GUICategory": "Weapon",
    // "WeaponType": (weapon_type) => weapon_type !== "Bow" && weapon_type !== "Crossbow" ,
    "DamageHealthLight_OnHit": (damage: number) => {
        return damage > 6
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

// Which percent of the maximum (per type) should the weapon get ?
const thales_delta = 0.7

export function humanMeleeWeapons(itemTable: Item[], itemDict: { [reference: string]: Item }) {

    let human_weapon_noBow = filterItem(<Item[]>itemTable, HumanWeaponSelector_noBow)
    let weapon_by_type: {
        [type: string]: {
            "damage": number,
            "index": string
        }[]
    } = {}
    human_weapon_noBow.forEach((human_weapon) => {
        // Classify by bot WeaponType and ArcheTy-pe as it appears inconstency
        let type = human_weapon.WeaponType + human_weapon.WeaponArcheType
        if (weapon_by_type[type] === undefined) weapon_by_type[type] = []
        weapon_by_type[type].push({
            "damage": human_weapon.DamageHealthLight_OnHit,
            "index": human_weapon.RowName
        })
    })
    let modifiedHumanWeapon: Item[] = []
    Object.values(weapon_by_type).forEach((human_weapon_resume_table) => {
        let sorted_weapons = human_weapon_resume_table.sort((a, b) => a.damage - b.damage)
        let sorted_weapons_length = sorted_weapons.length
        // let minimum: { damage: number, index: string } = sorted_weapons[0]
        // let rank2: { damage: number, index: string } = sorted_weapons[1]
        // let rank3: { damage: number, index: string } = sorted_weapons[2]
        let maximum: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 1]
        // let rankMinus1: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 2]
        // let rankMinus2: { damage: number, index: string } = sorted_weapons[sorted_weapons_length - 3]

        let typedModifiedHumanWeapon = sorted_weapons.map((typed_human_weapon) => {
            let human_weapon = itemDict[typed_human_weapon.index]
            let new_weapon = { ...human_weapon };
            let increment = (maximum.damage - human_weapon.DamageHealthLight_OnHit) * thales_delta + (/Exceptional/.test(human_weapon.Name) ? 1 : 0) + (/Flawless/.test(human_weapon.Name) ? 2 : 0)
            new_weapon.DamageHealthHeavy_OnHit = Math.round(human_weapon.DamageHealthHeavy_OnHit + increment)
            new_weapon.DamageHealthLight_OnHit = Math.round(human_weapon.DamageHealthLight_OnHit + increment)
            return new_weapon
        })
        modifiedHumanWeapon.push(...typedModifiedHumanWeapon)
    })


    return modifiedHumanWeapon
}

export default humanMeleeWeapons