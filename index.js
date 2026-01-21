import { deck, users } from './setup.js';

//Given a deck of cards
//Write a function that draw x cards and tell the user the remaining number of cards in each suit and each value
//
//i.e.
// {
//  hand:
//  [
//   {
//     suit: "Clubs",
//     value: "7"
//   },
//   ...
// ],
//   remainingSuits: {
//     spades: 1,
//     hearts: 2,
//     ...
//   },
//   remainingValues: {
//     A: 2,
//     K: 2,
//     Q: 3,
//     ...
//   }
// }

function drawCards(deck, num) {
  const hand = [];
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    hand.push(deck[randomIndex]);
    deck.splice(randomIndex, 1);
  }

  // Calculate remaining suits and values
  const remainingSuits = {};
  const remainingValues = {};

  deck.forEach(card => {
    if (remainingSuits[card.suit]) {
      remainingSuits[card.suit]++;
    } else {
      remainingSuits[card.suit] = 1;
    }
    if (remainingValues[card.value]) {
      remainingValues[card.value]++;
    } else {
      remainingValues[card.value] = 1;
    }
  });
  return { hand, remainingSuits, remainingValues };
}

console.log(drawCards(deck, 5));


// Given an array of users
// Write a function that will remove any duplicates from the users array and show the number of total duplicates
// The duplicated user should be reduced to one instance in the array
// i.e.
// userIn = [
//   {
//     name: 'Smith, John',
//     eyeColor: 'blue',
//     hairColor: 'red'
//   },
//   {
//     name: 'Smith, John',
//     eyeColor: 'blue',
//     hairColor: 'red'
//   }
// ]
// returnArray = {
//   returnUsers: {
//     name: 'Smith, John',
//     eyeColor: 'blue',
//     hairColor: 'red'
//   },
//   dupeCount: 1
// }

function deduplicateUsers(users) {
  const uniqueUsers = [];
  let dupeCount = 0;
  const userSet = new Set();

  users.forEach(user => {
    const userString = JSON.stringify(user);
    if (!userSet.has(userString)) {
      userSet.add(userString);
      uniqueUsers.push(user);
    } else {
      dupeCount++;
    }
  })
  return { returnUsers: uniqueUsers, dupeCount };
}

console.log(deduplicateUsers(users));

// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// --------NON CODING CHALLENGE--------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------


//Given a system that will allow users to create events that will be stored in a database
//And given that the database only allows searching by a single field
//And given that not all fields need to be viewable by a user
//How would you design a record object to allow you to search for events by multiple fields
//Given that you can control the object schema
//And given that all user editable fields are limited to numbers and letters
//NOTE: This question does not have a correct answer, it is a design question to see how you think about the problem

// Because the database only allows searching by a single field, I would design the event record object to include a dedicated "searchIndex" field. This field would be a concatenated string of all the searchable fields in the event object.

// For example,
// Event Data the user can see:
// {
//   eventName: "Annual Meeting",
//   eventDate: "2023-10-15",
//   eventLocation: "Conference Room A"
// }
//
// Event Data the system stores:
// {
//   eventName: "Annual Meeting",
//   eventDate: "2023-10-15",
//   eventLocation: "Conference Room A",
//   searchIndex: "annual meeting 20231015 conference room a"
// }

// The "searchIndex" field would be created by concatenating the values of all fields that need to be searchable, converting them to lowercase, and normalizing values by lowercasing and removing non-alphanumeric characters. This way, when a user searches for an event, the system can simply query the "searchIndex" field with the search term, allowing for multi-field search capabilities within the constraints of the database.

// The searchIndex is designed to be a hidden field that users cannot edit directly, ensuring data integrity while still providing the necessary search functionality.

// Some constraints to this approach include:
// 1. The length of the searchIndex field must be within the database's limits.
// 2. The system must ensure that the searchIndex is updated whenever any of the searchable fields are modified.
// 3. This approach may lead to larger storage requirements due to the additional searchIndex field.
// 4. Search precision may be affected by the concatenation method, so careful consideration of how fields are combined is necessary to avoid false positives or negatives in search results.


// End of non-coding challenge.