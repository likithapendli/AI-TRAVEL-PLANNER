const generateTravelPlan = require('../backend/utils/aiHelper');

const test3Day = generateTravelPlan('Hyderabad', 10000, 3);
console.log('3-Day Hyderabad Density:', test3Day.daily_schedule[0].places.length, 'places');
console.log('Total Hotels:', test3Day.hotels.length);
console.log('Total Restaurants:', test3Day.restaurants.length);

const test7Day = generateTravelPlan('Bangalore', 15000, 7);
console.log('7-Day Bangalore Density:', test7Day.daily_schedule[0].places.length, 'places');

if (test3Day.daily_schedule[0].places.length === 7 && test7Day.daily_schedule[0].places.length === 6) {
    console.log('VERIFICATION SUCCESS: Density logic confirmed.');
} else {
    console.log('VERIFICATION FAILED: Counts do not match expectations.');
}
