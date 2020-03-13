import filterItem from '../selectOnItemTable'
import { Item, ItemSelector } from '../struct/Item'

const MonsterWeaponSelector: ItemSelector = {
    "GUICategory": "Armor",
    "DamageHealthLight_OnHit": (damage: number) => {
        return damage > 0
    }
}
interface StepAndFactor {
    step: number,
    factor: number
}
export function customCurve(itemTable: Item[], stepsAndFactors: StepAndFactor[]) {
    let monster_weapons = filterItem(<Item[]>itemTable, MonsterWeaponSelector)

    return monster_weapons.map((m_weapon) => {
        let current_step = 0
        let damage = m_weapon.DamageHealthHeavy_OnHit
        let new_damage = 0
        console.log('Base damage : ' + damage)
        while (current_step < stepsAndFactors.length - 1) {
            let current_delta = Math.min(damage, stepsAndFactors[current_step + 1].step)
            damage -= current_delta
            new_damage += current_delta * stepsAndFactors[current_step ].factor
            current_step++
            if (damage === 0 ) current_step = stepsAndFactors.length
        }
        new_damage += damage * stepsAndFactors[ stepsAndFactors.length - 1].factor
        console.log('remanant : ' + damage)
        console.log('final damage : ' + new_damage)
        return {...m_weapon,"DamageHealthHeavy_OnHit" : Math.floor(new_damage),"DamageHealthLight_OnHit" : Math.floor(new_damage)}
    })
}   

export default customCurve