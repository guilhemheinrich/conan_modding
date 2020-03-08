import Monster from '../struct/Monster'

const steps = [0, 700, 2000, 5000]
const factor = [1, 0.5, 0.3, 0.1]

interface StepAndFactor {
    hp_step: number,
    factor: number
}

export function customCurve(monstersStats: Monster[], stepsAndFactors: StepAndFactor[]) {
    return monstersStats.map((monster) => {
        let current_step = 0
        let health_pool = monster.MonsterHealth
        let new_health_pool = 0
        console.log('Base hp : ' + health_pool)
        while (current_step < stepsAndFactors.length - 1) {
            let current_delta = Math.min(health_pool, stepsAndFactors[current_step + 1].hp_step)
            health_pool -= current_delta
            new_health_pool += current_delta * stepsAndFactors[current_step ].factor
            current_step++
            if (health_pool === 0 ) current_step = stepsAndFactors.length
        }
        new_health_pool += health_pool * stepsAndFactors[ stepsAndFactors.length - 1].factor
        console.log('remanant : ' + health_pool)
        console.log('final hp : ' + new_health_pool)
        return {...monster, "MonsterHealth": Math.floor(new_health_pool)}
    })
}   

export default customCurve