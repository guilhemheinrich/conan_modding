import {Item, ItemSelector, selector} from '../struct/Item'
import selectItem from '../selectOnItemTable'
const HumanArmorSelector: ItemSelector = {
    "GUICategory": "Armor",
    "DamageHealthLight_OnHit": (damage: number) => {
        return damage > 0 
    },
}
export  function selectHumanArmor(itemTable: Item[]) {
    return selectItem(itemTable, HumanArmorSelector)
}

export default selectHumanArmor