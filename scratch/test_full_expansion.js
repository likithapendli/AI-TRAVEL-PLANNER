const generateTravelPlan = require('../backend/utils/aiHelper');

const testHampi = generateTravelPlan('Hampi', 12000, 3);
console.log('--- Hampi Data Counts ---');
console.log('Famous Landmarks:', testHampi.famous_places.length);
console.log('Spiritual & Historical Sites:', testHampi.temples.length);
console.log('Hotels:', testHampi.hotels.length);
console.log('Restaurants:', testHampi.restaurants.length);

if (testHampi.famous_places.length === 5 && testHampi.temples.length === 5) {
    console.log('VERIFICATION SUCCESS: All expanded categories have 5 items.');
} else {
    console.log('VERIFICATION FAILED: Data expansion incomplete.');
}
