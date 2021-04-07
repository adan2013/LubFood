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
        { code: 'UNKNOW', name: 'Dowolna', min: 0, max: 0, step: null },
        { code: 'QUANTITY', name: 'Sztuki', min: 0, max: 20, step: [0.25, 1] },
        { code: 'ML', name: 'Mililitry', min: 0, max: 3000, step: [10, 100] },
        { code: 'GLASS', name: 'Szklanki', min: 0, max: 10, step: [0.25, 1] },
        { code: 'KG', name: 'Kilogramy', min: 0, max: 10, step: [0.1, 0.5] },
        { code: 'G', name: 'Gramy', min: 0, max: 5000, step: [10, 100] },
        { code: 'SPOON', name: 'Łyżka', min: 0, max: 10, step: [0.25, 1] },
        { code: 'TEASPOON', name: 'Łyżeczka', min: 0, max: 10, step: [0.5, 1] },
    ],
}
