import { Page } from "@playwright/test";

export class LoginPage {
    page: any;
    constructor(page) {
      this.page = page;
    }
  
    async userLogin() {
      await this.page.goto('http://localhost:5173/signin');
      await this.page.getByPlaceholder("+91 111 222 3334").fill("1234567890");
      await this.page.getByPlaceholder("Password").fill("hashedpassword1");
      await this.page.getByRole("button", { name: "Login" }).click();
      await this.page.waitForNavigation();
    }

    async publisherLogin() {
      await this.page.goto('http://localhost:5173/signin');
      await this.page.getByPlaceholder("+91 111 222 3334").fill("2345678901");
      await this.page.getByPlaceholder("Password").fill("hashedpassword1");
      await this.page.getByRole("button", { name: "Login" }).click();
      await this.page.waitForNavigation();
    }
    
  }