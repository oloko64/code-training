/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

function waitScroll() {
  for (var i = 0; i < 10; i++) {
    cy.scrollTo("bottom");
    cy.wait(500);
  }
}

function removeJunk(text) {
  let html = document.createElement("div");
  html.innerHTML = text;
  html = Array.from(html.getElementsByTagName("a"));
  console.log(html[0]);
  const final = html.map((el) => {
    const text = el.innerText
      .replace(/\n/g, "")
      .split(" ")
      .filter((el) => el !== "");
    const name = text
      .slice(0, text.length)
      .join(" ")
      .replace(/\t/g, "")
      .split(/(0?[1-9]|[12][0-9]|3[01])\s[a-zA-Z]+,\s[0-9]+/)[0]
      .trim();
    const value = text
      .slice(0, text.length)
      .join(" ")
      .replace(/\t/g, "")
      .split(" ");
    return {
      name,
      url: el.href,
      value: value[value.length - 1],
    };
  });
  // html.forEach(el => {
  //   console.log(el.getAttribute("href"))
  // })
  cy.log(JSON.stringify(final));
}

describe("example to-do app", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("https://store.steampowered.com/search/?filter=topsellers");
  });

  it("loads the site correctly", () => {
    // This test ensures that the page has loaded correctly.
    // Since we have a single page application, we can
    // just check for the presence of a specific element
    // to verify that the page loaded correctly.
    cy.get(".leftcol").should("be.visible");
    let text;
    waitScroll();
    cy.get("#search_resultsRows").then(($leftcol) => {
      text = $leftcol.html();
      removeJunk(text);
    });
  });
});
