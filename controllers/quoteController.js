import {
  getAll,
  getById,
  saveAll,
  deleteById,
  updateById,
  insertOne,
} from "../model/quoteModel.js";

export async function getQuotes() {
  try {
    const quotes = await getAll();
    return quotes;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getQuote(id) {
  try {
    const quote = await getById(id);
    return quote;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRandom() {
  try {
    const quotes = await getQuotes();

    if (quotes) {
      return quotes[Math.floor(Math.random() * quotes.length)];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function prepareDB() {
  try {
    const quotes = await getQuotes();

    if (!quotes) {
      const quotesArr = [
        {
          quote: "Be the change that you wish to see in the world.",
          author: "Mahatma Gandhi",
        },
        {
          quote:
            "The only limit to our realization of tomorrow is our doubts of today.",
          author: "Franklin D. Roosevelt",
        },
        {
          quote:
            "In the end, we will remember not the words of our enemies, but the silence of our friends.",
          author: "Martin Luther King Jr.",
        },
        {
          quote:
            "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
          author: "Ralph Waldo Emerson",
        },
        {
          quote:
            "Success is not final, failure is not fatal: It is the courage to continue that counts.",
          author: "Winston Churchill",
        },
        {
          quote: "You miss 100% of the shots you don’t take.",
          author: "Wayne Gretzky",
        },
        {
          quote:
            "It does not matter how slowly you go as long as you do not stop.",
          author: "Confucius",
        },
        {
          quote: "The only thing we have to fear is fear itself.",
          author: "Franklin D. Roosevelt",
        },
        {
          quote: "Life is what happens when you’re busy making other plans.",
          author: "John Lennon",
        },
      ];
      await saveAll(quotesArr);
    } else {
      return quotes;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function deleteQuoteById(id) {
  try {
    const result = await deleteById(id);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateQuoteById(id, quote) {
  try {
    const result = await updateById(id, quote);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function insertQuote(quote) {
  try {
    const result = await insertOne(quote);
    if (result && result.insertedId) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
