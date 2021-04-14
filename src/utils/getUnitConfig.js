import config from '../config'

export default (dictionary, ingredientId) => {
    if(ingredientId === '' || ingredientId === undefined) return {}
    const unitCode = dictionary.find(i => i.id === ingredientId).unit
    const uc = config.ingredientUtils.find(i => i.code === unitCode)
    if(!uc) return {}
    return {
        minValue: uc.min,
        maxValue: uc.max,
        step: uc.step,
        label: uc.label,
        code: uc.code
    }
}
