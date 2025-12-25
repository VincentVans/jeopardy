/* =====================
   General Knowledge Trivia Data
   Categories: 6
   Difficulty: 100 (Kids) -> 500 (Hard Trivia)
===================== */

const categories = [
  {
    name: "Animal Kingdom",
    questions: [
      { question: "Which big cat is known as the 'King of the Jungle'?", answer: "Lion", value: 100, used: false },
      { question: "What is the tallest land animal in the world?", answer: "Giraffe", value: 200, used: false },
      { question: "How many legs does a fly have?", answer: "6", value: 300, used: false },
      { question: "What is the only mammal that can fly?", answer: "Bat", value: 400, used: false },
      { question: "What is the specific name for a group of crows?", answer: "A Murder", value: 500, used: false },
    ]
  },
  {
    name: "World Geography",
    questions: [
      { question: "Which country is directly north of the USA?", answer: "Canada", value: 100, used: false },
      { question: "In which city would you find the Eiffel Tower?", answer: "Paris", value: 200, used: false },
      { question: "Which country has the largest population in the world?", answer: "India (as of 2025 they've surpassed China)", value: 300, used: false },
      { question: "Which continent is home to the Gobi Desert?", answer: "Asia", value: 400, used: false },
      { question: "What is the capital city of Australia?", answer: "Canberra", value: 500, used: false }
    ]
  },
  {
    name: "History Buff",
    questions: [
      { question: "Who was the very first President of the United States?", answer: "George Washington", value: 100, used: false },
      { question: "Which ancient civilization built the three great Pyramids of Giza?", answer: "The Egyptians", value: 200, used: false },
      { question: "In what decade did the Titanic sink?", answer: "1910-1920 (1912)", value: 300, used: false },
      { question: "Who was the first human in space?", answer: "Yuri Gagarin", value: 400, used: false },
      { question: "Which king famously had 6 wives, some of which he had executed for not giving him a son?", answer: "Henry the 8th", value: 500, used: false }
    ]
  },
  {
    name: "Science Lab",
    questions: [
      { question: "What planet do we live on?", answer: "Earth", value: 100, used: false },
      { question: "H2O is the chemical formula for what liquid?", answer: "Water", value: 200, used: false },
      { question: "What gas do plants breathe in (and humans breathe out)?", answer: "Carbon Dioxide (CO2)", value: 300, used: false },
      { question: "What is the hardest natural substance found on Earth?", answer: "Diamond", value: 400, used: false },
      { question: "In the Periodic Table, 'Au' is the symbol for what?", answer: "Gold", value: 500, used: false }
    ]
  },
  {
    name: "Entertainment",
    questions: [
      { question: "What color are the Minions in the 'Despicable Me' movies?", answer: "Yellow", value: 100, used: false },
      { question: "Who lives in a pineapple under the sea?", answer: "SpongeBob SquarePants", value: 200, used: false },
      { question: "Which superhero is the secret identity of Peter Parker?", answer: "Spider-Man", value: 300, used: false },
      { question: "Who wrote the 'Lord of the Rings' and 'Hobbit' book series?", answer: "J.R.R. Tolkien", value: 400, used: false },
      { question: "Which actress holds the record for the most Academy Awards (Oscars) for acting (4 wins)?", answer: "Katharine Hepburn", value: 500, used: false }
    ]
  },
  {
    name: "Food & Drink",
    questions: [
      { question: "Which curved fruit is yellow when it is ripe?", answer: "Banana", value: 100, used: false },
      { question: "Which country is the origin of the dish Ratatouille?", answer: "French", value: 200, used: false },
      { question: "What is the main ingredient in pesto?", answer: "Basil", value: 300, used: false },
      { question: "What is the only food that arguably never spoils and can be eaten after thousands of years?", answer: "Honey", value: 400, used: false },
      { question: "Derived from a flower crocus, what is the most expensive spice in the world by weight?", answer: "Saffron", value: 500, used: false }
    ]
  }
];

// "guess the number" style tie-breaker
const tieBreaker = {
  question: "How deep is the Mariana Trench (the deepest part of the ocean) in meters?",
  answer: 10935
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { categories, tieBreaker };
}