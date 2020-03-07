export interface Item {
    "RowName": string,
		"Name": string,
		"ShortDesc": string,
		"LongDesc":string,
		"Icon": string,
		"ItemClass":string,
		"BuildingClass": string,
		"VisualObject": string,
		"ActionBlueprint_Use": string,
		"MaxStackSize": number,
		"EquipLocation": number,
		"GUICategory": 'Armor' | 'Weapon' ,
		"ArmourValue": number,
		"ArmorType": number,
		"SoundPhysicalSurface": number,
		"WeaponType": string, // Add type here
		"WeaponArcheType": string,// Add type here
		"CompatableAmmunitions": number[], // Munition compatible
		"SoundTransmitterType": number,
		"KnockbackResponseWeapon": boolean,
		"WeaponStaminaAttackSingleBasic": number,
		"WeaponStaminaAttackSingleSpecial": number,
		"WeaponStaminaAttackDualBasic": number,
		"WeaponStaminaAttackDualSpecial": number,
		"WeaponStaminaHeavyChargedRegenModifier": number,
		"WeaponSpeedHeavyChargedModifier": number,
		"EncumbranceWeight": number,
		"ConeAngle": number,
		"ConeMaxDistance": number,
		"DamageHealthLight_OnHit": number,
		"DamageHealthHeavy_OnHit": number,
		"DamageStaminaLight_OnHit": number,
		"DamageStaminaHeavy_OnHit": number,
		"DamageHealthLight_OnBlock": number,
		"DamageHealthHeavy_OnBlock": number,
		"DamageStaminaLight_OnBlock": number,
		"DamageStaminaHeavy_OnBlock": number,
		"HarvestDamage": number,
        "WeaponUsage": number,
		"MaxAttackReach": number,
        "MinAttackReach": number,
		"MinAttackDistance": number,
		"WeaponEffectWidth": number,
		"WeaponEffectHeight": number,
		"ItemTier": number,
        "ArmorPen": number,
		"DamageConcussiveLightOnHit": number,
		"DamageConcussiveHeavyOnHit": number,
		"DamageConcussiveLightOnBlock": number,
		"DamageConcussiveHeavyOnBlock": number,
		"DamageTier": string,
		"CoolDownTime": number,
		"ReuseTime": number,
		"SelectionWeight": number,
		"KnockbackOffenseBasic": number,
		"KnockbackOffenseSpecial": number,
		"KnockbackOffenseBasicOnBlock": number,
		"KnockbackOffenseSpecialOnBlock": number,
		"KnockbackDefense": number,
		"VisualStaticMesh": string,
		"VisualSkeletalMesh": string,
		"VisualDestructibleMesh": string,
		"WeaponStatusDefault": number,
		"WeaponStatusCurrent": number,
		"WeaponStatusDecrement": number,
		"PerishRate": number,
		"PerishTo": number,
		"MaxDurability": number,
		"RepairItem1": number,
		"RepairItem1_Amount": number,
		"RepairItem1_Weight": number,
		"RepairItem2": number,
		"RepairItem2_Amount": number,
		"RepairItem2_Weight": number,
		"RepairItem3": number,
		"RepairItem3_Amount": number,
		"RepairItem3_Weight": number,
		"AffectedByDamageTiers": number,
		"BuildingPieceScore": number,
		"BuildingMaxHealth": number,
		"RepairXP": number,
		"FirstModifier": string,
		"SecondModifier": string,
		"ThirdModifier": string,
		"FourthModifier": string,
		"FoodAmount": number,
		"DrinkAmount": number,
		"BurnTime": number,
		"ItemFlags": number,
		"ItemContainerSize": number,
		"AvatarType": string,
		"DyeColourID": number,
		"WarPaintID": number,
		"StaminaCostMultiplier": number,
		"StaminaClimbingCostMultiplier":number,
		"LeavesGhostItem": boolean,
		"DLCPackage": string,
		"SpawnTemplateID": string
}
// A selector is a value, an array of value, or a function with a boolean
export type selector<T> = T | T[] | ((arg: T) => boolean)
export interface ItemSelector {
    "RowName"?: selector<string>,
    "Name"?: selector<string>,
    "ShortDesc"?: selector<string>,
    "LongDesc"?:selector<string>,
    "Icon"?: selector<string>,
    "ItemClass"?:selector<string>,
    "BuildingClass"?: selector<string>,
    "VisualObject"?: selector<string>,
    "ActionBlueprint_Use"?: selector<string>,
    "MaxStackSize"?: selector<number>,
    "EquipLocation"?: selector<number>,
    "GUICategory"?: selector<'Armor' | 'Weapon'> ,
    "ArmourValue"?: selector<number>,
    "ArmorType"?: selector<number>,
    "SoundPhysicalSurface"?: selector<number>,
    "WeaponType"?: selector<string>, // Add type here
    "WeaponArcheType"?: selector<string>,// Add type here
    "CompatableAmmunitions"?: selector<number>[], // Munition compatible
    "SoundTransmitterType"?: selector<number>,
    "KnockbackResponseWeapon"?: boolean,
    "WeaponStaminaAttackSingleBasic"?: selector<number>,
    "WeaponStaminaAttackSingleSpecial"?: selector<number>,
    "WeaponStaminaAttackDualBasic"?: selector<number>,
    "WeaponStaminaAttackDualSpecial"?: selector<number>,
    "WeaponStaminaHeavyChargedRegenModifier"?: selector<number>,
    "WeaponSpeedHeavyChargedModifier"?: selector<number>,
    "EncumbranceWeight"?: selector<number>,
    "ConeAngle"?: selector<number>,
    "ConeMaxDistance"?: selector<number>,
    "DamageHealthLight_OnHit"?: selector<number>,
    "DamageHealthHeavy_OnHit"?: selector<number>,
    "DamageStaminaLight_OnHit"?: selector<number>,
    "DamageStaminaHeavy_OnHit"?: selector<number>,
    "DamageHealthLight_OnBlock"?: selector<number>,
    "DamageHealthHeavy_OnBlock"?: selector<number>,
    "DamageStaminaLight_OnBlock"?: selector<number>,
    "DamageStaminaHeavy_OnBlock"?: selector<number>,
    "HarvestDamage"?: selector<number>,
    "WeaponUsage"?: selector<number>,
    "MaxAttackReach"?: selector<number>,
    "MinAttackReach"?: selector<number>,
    "MinAttackDistance"?: selector<number>,
    "WeaponEffectWidth"?: selector<number>,
    "WeaponEffectHeight"?: selector<number>,
    "ItemTier"?: selector<number>,
    "ArmorPen"?: selector<number>,
    "DamageConcussiveLightOnHit"?: selector<number>,
    "DamageConcussiveHeavyOnHit"?: selector<number>,
    "DamageConcussiveLightOnBlock"?: selector<number>,
    "DamageConcussiveHeavyOnBlock"?: selector<number>,
    "DamageTier"?: selector<string>,
    "CoolDownTime"?: selector<number>,
    "ReuseTime"?: selector<number>,
    "SelectionWeight"?: selector<number>,
    "KnockbackOffenseBasic"?: selector<number>,
    "KnockbackOffenseSpecial"?: selector<number>,
    "KnockbackOffenseBasicOnBlock"?: selector<number>,
    "KnockbackOffenseSpecialOnBlock"?: selector<number>,
    "KnockbackDefense"?: selector<number>,
    "VisualStaticMesh"?: selector<string>,
    "VisualSkeletalMesh"?: selector<string>,
    "VisualDestructibleMesh"?: selector<string>,
    "WeaponStatusDefault"?: selector<number>,
    "WeaponStatusCurrent"?: selector<number>,
    "WeaponStatusDecrement"?: selector<number>,
    "PerishRate"?: selector<number>,
    "PerishTo"?: selector<number>,
    "MaxDurability"?: selector<number>,
    "RepairItem1"?: selector<number>,
    "RepairItem1_Amount"?: selector<number>,
    "RepairItem1_Weight"?: selector<number>,
    "RepairItem2"?: selector<number>,
    "RepairItem2_Amount"?: selector<number>,
    "RepairItem2_Weight"?: selector<number>,
    "RepairItem3"?: selector<number>,
    "RepairItem3_Amount"?: selector<number>,
    "RepairItem3_Weight"?: selector<number>,
    "AffectedByDamageTiers"?: selector<number>,
    "BuildingPieceScore"?: selector<number>,
    "BuildingMaxHealth"?: selector<number>,
    "RepairXP"?: selector<number>,
    "FirstModifier"?: selector<string>,
    "SecondModifier"?: selector<string>,
    "ThirdModifier"?: selector<string>,
    "FourthModifier"?: selector<string>,
    "FoodAmount"?: selector<number>,
    "DrinkAmount"?: selector<number>,
    "BurnTime"?: selector<number>,
    "ItemFlags"?: selector<number>,
    "ItemContainerSize"?: selector<number>,
    "AvatarType"?: selector<string>,
    "DyeColourID"?: selector<number>,
    "WarPaintID"?: selector<number>,
    "StaminaCostMultiplier"?: selector<number>,
    "StaminaClimbingCostMultiplier"?:selector<number>,
    "LeavesGhostItem"?: boolean,
    "DLCPackage"?: selector<string>,
    "SpawnTemplateID"?: selector<string>
}

export default Item

// function selectorIsFunction(selector: selector<any>): selector is Function {
//     return (typeof selector === 'function');
// }

// function selectorIsPrimitive(selector: selector<any>): selector is string | number {
//     return (typeof selector === 'string' || typeof selector === 'number' );
// }

// function selectorIsArray(selector: selector<any>): selector is Array<string | number> {
//     return (Array.isArray(selector));
// }