import { test, expect } from '@playwright/test';


test.describe("Landing Page", () => {

  test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:5173")
  })

  test("should have corrrect meta data and elements", async ({page}) => {
    await page.goto("http:localhost:5173");

    await expect(page).toHaveTitle("Movie Booking")

    await expect(page.getByRole("heading",{
      name:"MOVIE BOOKING"
    })
    ).toBeVisible();

    await expect(page.getByRole("link",{
      name:"SignIn"
    })
    ).toBeVisible();

    await expect(page.getByRole("link",{
      name:"SignUp"
    })
    ).toBeVisible();

    await expect(page.getByRole("link",{
      name:"Home"
    })
    ).toBeVisible();

    await expect(page.getByRole("link",{
      name:"Exibitor"
    })
    ).toBeVisible();

  })

  test("should redirect to signin page on clicking signin link", async ({page}) => {

    await page.getByRole("link",{name:"SignIn"}).click();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/signin");
  })

  test("should redirect to signup page on clicking signin link", async ({page}) => {
    await page.getByRole("link",{name:"SignUp"}).click();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/signup");
  })

  test("should redirect to exibitor page on clicking signin link", async ({page}) => {
    await page.getByRole("link",{name:"Exibitor"}).click();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/publisherSignup");
  })


})
