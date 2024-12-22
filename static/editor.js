class QuoteEditor {
  constructor() {
    this.init();
  }

  init() {
    this.lightbox = document.querySelector("#lightbox");
    this.quoteText = document.querySelector("#new-quote-text");
    this.quoteAuthor = document.querySelector("#new-quote-author");
    this.quotesList = document.querySelector(".quotes-list");

    document.addEventListener("keyup", (e) => {
      if (e.key === "e") this.showEditor();
    });
  }

  showEditor = async () => {
    this.lightbox.classList.toggle("active");
    await this.reloadQuotesList();
  };

  reloadQuotesList = async () => {
    this.removeAllChildNodes(this.quotesList);

    const quotes = await this.getQuotes();
    for (const q of quotes) {
      console.log('cytat',q);
    //   const quoteHtml = this.getQuoteHtmlListItem(q);
    //   this.quotesList.appendChild(quoteHtml);
    }
  };

  getQuoteHtmlListItem = (quote) => {};

  getQuotes = async () => {
    try {
      const response = await fetch("/api/quotes");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }

    return null;
  };

  removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}

const quoteEditor = new QuoteEditor();
