/* =====================
   Christmas & Winter Trivia Data
   Categories: 6
   Difficulty: 100 (Kids) -> 500 (Hard Trivia)
===================== */

const categories = [
  {
    name: "Jolly Tunes",
    questions: [
      { question: "In 'Jingle Bells', what kind of sleigh is it?", answer: "One-horse open sleigh", value: 100, used: false },
      { question: "Which famous reindeer has a very shiny nose?", answer: "Rudolph", value: 200, used: false },
      { question: "Who originally crooned the best-selling single 'White Christmas'?", answer: "Bing Crosby", value: 300, used: false },
      { question: "On the 5th day of Christmas, what does my true love give to me?", answer: "Five Golden Rings", value: 400, used: false },
      { question: "In the song 'The Christmas Song' (Chestnuts roasting...), what are 'folks dressed up like'?", answer: "Eskimos", value: 500, used: false },
    ]
  },
  {
    name: "Silver Screen",
    questions: [
      { question: "What is the name of the magical snowman in the movie 'Frozen'?", answer: "Olaf", value: 100, used: false },
      { question: "In 'Home Alone', where is the family going for vacation when they leave Kevin behind?", answer: "Paris", value: 200, used: false },
      { question: "What acts as the 'battery' for the sleigh in the movie 'Elf'?", answer: "Christmas Spirit", value: 300, used: false },
      { question: "In 'A Christmas Story', what specific gift does Ralphie want more than anything?", answer: "Red Ryder BB Gun", value: 400, used: false },
      { question: "In 'It's a Wonderful Life', what is the name of the angel who helps George Bailey?", answer: "Clarence (Odbody)", value: 500, used: false }
    ]
  },
  {
    name: "Santa's Workshop",
    questions: [
      { question: "What are the pointy-eared people called who help Santa make toys?", answer: "Elves", value: 100, used: false },
      { question: "Where does Santa live?", answer: "The North Pole", value: 200, used: false },
      { question: "Which soft drink company is famous for shaping the modern image of Santa Claus in the 1930s?", answer: "Coca-Cola", value: 300, used: false },
      { question: "According to Alpine folklore, who is the horned figure that punishes naughty children?", answer: "Krampus", value: 400, used: false },
      { question: "What does the name of the reindeer 'Donner' translate to in German?", answer: "Thunder", value: 500, used: false }
    ]
  },
  {
    name: "Winter Wonderland",
    questions: [
      { question: "When water gets very cold and freezes solid, what does it turn into?", answer: "Ice", value: 100, used: false },
      { question: "What do many bears do during the winter to save energy?", answer: "Hibernate (Sleep)", value: 200, used: false },
      { question: "How many points/sides does a standard snowflake have?", answer: "6", value: 300, used: false },
      { question: "Which date in December usually marks the Winter Solstice in the Northern Hemisphere?", answer: "December 21st (accept 20-23)", value: 400, used: false },
      { question: "At what specific numerical temperature are Celsius and Fahrenheit exactly the same (it is very cold)?", answer: "-40", value: 500, used: false }
    ]
  },
  {
    name: "Tasty Treats",
    questions: [
      { question: "What two items do kids usually leave out for Santa on Christmas Eve?", answer: "Cookies and Milk", value: 100, used: false },
      { question: "What flavor is a traditional red and white candy cane?", answer: "Peppermint", value: 200, used: false },
      { question: "What house made of food do you find in the story of Hansel and Gretel?", answer: "Gingerbread House", value: 300, used: false },
      { question: "What popular Christmas beverage is made of milk, cream, sugar, whipped egg whites, and egg yolks?", answer: "Eggnog", value: 400, used: false },
      { question: "Known as 'Bûche de Noël' in France, what object is this cake shaped to look like?", answer: "A Yule Log", value: 500, used: false }
    ]
  },
  {
    name: "Traditions & Past",
    questions: [
      { question: "Whose birthday is celebrated on Christmas?", answer: "Jesus", value: 100, used: false },
      { question: "What do people hang by the fireplace to be filled with small gifts?", answer: "Stockings", value: 200, used: false },
      { question: "What three gifts did the Wise Men bring to the baby Jesus?", answer: "Gold, Frankincense, and Myrrh", value: 300, used: false },
      { question: "Which ballet, often performed at Christmas, features the Sugar Plum Fairy?", answer: "The Nutcracker", value: 400, used: false },
      { question: "The carol 'Good King Wenceslas' takes place on the 'Feast of Stephen'. What calendar date is that?", answer: "December 26th", value: 500, used: false }
    ]
  }
];

// "guess the number" style tie-breaker
// Fact: The world's tallest snowman (snowwoman) was built in Maine in 2008.
// It was 122 feet tall (approx 37.21 meters).
const tieBreaker = {
  question: "How tall (in meters) was 'Olympia', the world's tallest snowman ever built?",
  answer: 37.21
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { categories, tieBreaker };
}
