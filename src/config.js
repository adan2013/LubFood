export default {
    categories: [
        { code: 'cakes', name: 'Ciasta' },
        { code: 'maindishes', name: 'Dania główne' },
        { code: 'desserts', name: 'Desery' },
        { code: 'drinks', name: 'Napoje' },
        { code: 'snacks', name: 'Przekąski' },
        { code: 'soups', name: 'Zupy' },
    ],
    ingredientUtils: [
        { code: 'AMOUNT', name: 'Sztuki', min: 0, max: 10, float: true },
        { code: 'ML', name: 'Mililitry', min: 0, max: 3000, float: false },
        { code: 'GLASS', name: 'Szklanki', min: 0, max: 10, float: true },
        { code: '', name: '', min: 0, max: 0, float: true },
        { code: '', name: '', min: 0, max: 0, float: true },
        { code: '', name: '', min: 0, max: 0, float: true },
    ],
}
