import Monster from '../struct/Monster'

export function affineTrasformation(monstersStats: Monster[], threshold = 400, new_maximum = 4000) {
    let max_health = monstersStats.reduce((acc, monster) => Math.max(acc, monster.MonsterHealth), 0)
    return monstersStats.map((monster) => {
        let new_monsterhealth = monster.MonsterHealth 
        if (monster.MonsterHealth > threshold) {
            let increment = ((monster.MonsterHealth - threshold) / (max_health - threshold)) * new_maximum
            new_monsterhealth = threshold + increment 
            
        }
        return {...monster, MonsterHealth: new_monsterhealth }
    })
}   

export default affineTrasformation