import View from "./view";

class App {
  constructor() {
  }

  init() {
    this.view = new View();
  }
}

const app = new App();
app.init();
