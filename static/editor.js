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
      if (e.key === "e" && e.ctrlKey) this.showEditor();
    });

    document.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.processNewQuote();
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
      console.log("cytat", q);
      const quoteHtml = this.getQuoteHtmlListItem(q);
      this.quotesList.appendChild(quoteHtml);
    }
  };

  getQuoteHtmlListItem = (quoteData) => {
    const html = `
      <div class = "quote-list-item">
         ${quoteData.author} : ${quoteData.quote}
      </div>
      <div class = "quote-list-item-delete">
      <a href = "#" quote-id = "${quoteData._id}">X</a>
      </div>
      `;

    const li = document.createElement("li");
    li.classList.add("list-item");
    li.innerHTML = html;

    li.querySelector("a").addEventListener("click", (e) => {
      this.deleteQuote(quoteData._id);
    });

    return li;
  };

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

  processNewQuote = async () => {
    if (
      this.quoteText.value.length == 0 ||
      this.quoteAuthor.value.length == 0
    ) {
      console.log("Brak pełnych danych w formularzu");
      return;
    }

    const response = await fetch("/api/quote/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: this.quoteText.value,
        author: this.quoteAuthor.value,
      }),
    });

    const data = await response.json();
    if (data && data.saved === true) {
      console.log("Nowy element został zapisany w bazie z _id: ", data._id);

      this.reloadQuotesList();
      this.quoteText.value = "";
      this.quoteAuthor.value = "";
    }
  };

  deleteQuote = async (id) => {
    const response = await fetch("/api/quote/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const data = await response.json();
    if (data && data.deleted === true) {
      console.log("Element został usunuęty z bazy z _id: ", data.id);
    } else {
      console.error("Nie udało się usunąć elementu. Szczegóły: ", data.id);
    }
    this.reloadQuotesList();
  };
}

const quoteEditor = new QuoteEditor();
