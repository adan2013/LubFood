import config from '../config'

export default categoryCode => {
    const category = config.categories.find(i => i.code === categoryCode)
    return category ? category.name : ''
}
