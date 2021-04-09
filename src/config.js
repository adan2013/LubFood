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
        { code: 'UNKNOW', name: 'Dowolna', label: '', min: 0, max: 0, step: null },
        { code: 'QUANTITY', name: 'Sztuki', label: ' szt.', min: 0, max: 20, step: [0.25, 1] },
        { code: 'ML', name: 'Mililitry', label: ' ml', min: 0, max: 3000, step: [10, 100] },
        { code: 'GLASS', name: 'Szklanki', label: ' szklanki', min: 0, max: 10, step: [0.25, 1] },
        { code: 'KG', name: 'Kilogramy', label: ' kg', min: 0, max: 10, step: [0.1, 0.5] },
        { code: 'G', name: 'Gramy', label: ' g', min: 0, max: 5000, step: [10, 100] },
        { code: 'SPOON', name: 'Łyżka', label: ' łyżki', min: 0, max: 10, step: [0.25, 1] },
        { code: 'TEASPOON', name: 'Łyżeczka', label: ' łyżeczki', min: 0, max: 10, step: [0.5, 1] },
    ],
}
