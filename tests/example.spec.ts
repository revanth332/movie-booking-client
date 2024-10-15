import { test, expect } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { format } from "date-fns";

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should have corrrect meta data and elements", async ({ page }) => {
    await page.goto("http:localhost:5173");

    await expect(page).toHaveTitle("Movie Booking");

    await expect(
      page.getByRole("heading", {
        name: "MOVIE BOOKING",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: "SignIn",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: "SignUp",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: "Home",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: "Exibitor",
      })
    ).toBeVisible();
  });

  test("should redirect to signin page on clicking signin link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "SignIn" }).click();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/signin");
  });

  test("should redirect to signup page on clicking signin link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "SignUp" }).click();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/signup");
  });

  test("should redirect to exibitor page on clicking signin link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Exibitor" }).click();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/publisherSignup");
  });
});

test.describe("SignIn Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http:localhost:5173/signin");
  });

  test("should have correct meta data and elements", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Login",
      })
    ).toBeVisible();

    await expect(page.getByPlaceholder("+91 111 222 3334")).toBeVisible();

    await expect(page.getByPlaceholder("Password")).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Login",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: "Sign up",
      })
    ).toBeVisible();
  });

  test("should redirect to movies page on successful user login", async ({
    page,
  }) => {
    await page.getByPlaceholder("+91 111 222 3334").fill("1234567890");
    await page.getByPlaceholder("Password").fill("hashedpassword1");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForNavigation();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/movies");
  });

  test("should redirect to Published Movies page on successful publisher login", async ({
    page,
  }) => {
    await page.getByPlaceholder("+91 111 222 3334").fill("2345678901");
    await page.getByPlaceholder("Password").fill("hashedpassword1");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForNavigation();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/publishedMovies");
  });

  test("should display error message on invalid login", async ({ page }) => {
    await page.getByPlaceholder("+91 111 222 3334").fill("9876543210");
    await page.getByPlaceholder("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText(/Failed to Signin (.+)/)).toContainText(/Failed to Signin/)
  });

  
  test("should redirect to signup page on clicking signup link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Sign up" }).click();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/signup");
  });

});

test.describe("SignUp Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http:localhost:5173/signup");
  });

  test("should have correct meta data and elements", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Sign Up",
      })
    ).toBeVisible();

    await expect(page.getByPlaceholder("First name")).toBeVisible();
    await expect(page.getByPlaceholder("Last name")).toBeVisible();
    await expect(page.getByPlaceholder("Phone number")).toBeVisible();
    await expect(page.getByPlaceholder("m@example.com")).toBeVisible();
    await expect(page.getByPlaceholder("Date Of Birth")).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Create an account",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: "Sign in",
      })
    ).toBeVisible();
  });

  test("should redirect to movies page on successfull signup", async ({
    page,
  }) => {
    await page.getByPlaceholder("First name").fill("Revanth");
    await page.getByPlaceholder("Last name").fill("Lanka")
    await page.getByPlaceholder("Phone number").fill("9959965917")
    await page.getByPlaceholder("m@example.com").fill("r@gmail.com")
    await page.getByPlaceholder("Date Of Birth").fill("2002-09-18")
    await page.getByPlaceholder("Password").fill("revanth@321")
    await page.getByRole("button", { name: "Create an account" }).click();
    await page.waitForNavigation();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/movies");
  });


  // test("should display error message on invalid signup", async ({ page }) => {
  //   await page.getByPlaceholder("+91 111 222 3334").fill("9876543210");
  //   await page.getByPlaceholder("Password").fill("wrongpassword");
  //   await page.getByRole("button", { name: "Login" }).click();

  //   await expect(page.getByText(/Failed to login (.+)/)).toContainText(/Failed to login/)
  // });

    test("should redirect to signin page on clicking signin link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Sign in" }).click();

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:5173/signin");
  });

});

test.describe("Sign up page for Exibitor",() => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http:localhost:5173/publisherSignup");
  });

  test("should contain correct data",async ({page}) => {
    // expect(page.getByRole("heading",{
    //   name:"Publisher Sign Up"
    // })).toBeVisible();
    
    await expect(page.getByPlaceholder("Theater Name")).toBeVisible();
    await expect(page.getByPlaceholder("Full address of the theater")).toBeVisible();
    await expect(page.getByPlaceholder("m@example.com")).toBeVisible();
    await expect(page.getByPlaceholder("Phone number")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByPlaceholder("Number of seats in Theater")).toBeVisible();
    await expect(page.getByPlaceholder("City")).toBeVisible();

    await expect(await page.getByRole("button",{
      name:"Create an account"
    })).toBeVisible();

  })

  test("should redirect to Published Movies page on successful Sign up as Exibitor", async ({page}) => {

    function generateRandomNumber() {
      return Math.floor(Math.random() * (20)) + 1;
    }

    await page.getByPlaceholder("Theater Name").fill("Theater"+generateRandomNumber());
    await page.getByPlaceholder("Full address of the theater").fill("address"+generateRandomNumber());
    await page.getByPlaceholder("m@example.com").fill("Theater"+generateRandomNumber()+"@example.com");
    await page.getByPlaceholder("Phone number").fill("1029384767");
    await page.getByPlaceholder("Password").fill("Theater"+generateRandomNumber());
    await page.getByPlaceholder("Number of seats in Theater").fill("13"+generateRandomNumber());
    await page.getByPlaceholder("City").fill("city"+generateRandomNumber());

    await page.getByRole("button",{
      name:"Create an account"
    }).click();

    await page.waitForNavigation();
    const currentUrl = await page.url();
    expect(currentUrl).toBe("http://localhost:5173/publishedMovies");
  })

})

test.describe("Movies Page",() => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    loginPage.userLogin();
    await page.waitForURL((url) => url.toString().includes("movies"))
  })

  test("should have correct meta data and elements",async ({page}) => {
    await expect(page.getByRole("heading",{
      name:"Filters"
    })).toBeVisible();

    await expect(page.getByRole("heading",{
      name:"Genre"
    })).toBeVisible();

    await expect(page.getByRole("heading",{
      name:"Rating"
    })).toBeVisible();

    await expect(page.getByPlaceholder("Search movies...")).toBeVisible();

    await expect(page.getByTestId("username")).toContainText(/John/);

    await expect(page.getByRole("link",{
      name:"Bookings"
    })).toBeVisible();

    await expect(page.getByRole("link",{
      name:"Movies"
    })).toBeVisible();

    await expect(page.getByRole("button",{
      name:"Signout"
    })).toBeVisible();

  })

  test("shold render movies based on input value",async ({page}) => {
    await page.getByPlaceholder("Search movies...").fill("b");
    await page.waitForTimeout(2000)
    const movies = await page.getByRole("button",{
      name:"Book Now"
    })
    await expect(await movies.count()).toBeGreaterThanOrEqual(0);

    if(await movies.count() == 0) await expect(await page.getByText("No movies found"));
  });

  test("should be navigated to home page when clicked on signout", async ({page}) => {
    await page.getByRole("button",{
      name:"Signout"
    }).click();

    const currentUrl = page.url();
    await expect(currentUrl).toBe("http://localhost:5173/")
  })

  test("should render movies based on checked value of genre", async ({page}) => {
    const checkBox = await page.getByTestId("drama-genre")

    await checkBox.click();
    const movies = await page.getByRole("button",{
      name:"Book Now"
    })

    if(await movies.count() == 0) await expect(await page.getByText("No movies found")).toBeVisible();
  })

  test("should redirect to page displaying available theaters for the movie selected",async ({page}) => {
    const bookBtns = await page.getByRole("button",{
      name:"Book Now"
    })
    await bookBtns.first().click();

    const currentUrl = page.url();
    expect(currentUrl).toMatch(/^http:\/\/localhost:5173\/theaters\/tt\d+$/);
  })

})

test.describe("Theater Page",() => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    loginPage.userLogin();
    await page.waitForURL((url) => url.toString().includes("movies"));

    const bookBtns = await page.getByRole("button",{
      name:"Book Now"
    })
    await bookBtns.first().click();
    const currentUrl = page.url();

    await page.goto(currentUrl)
  })

  test("should contain correct elements",async ({page}) => {
    await expect(page.getByRole("heading",{
      name:/^[a-zA-Z]+( [a-zA-Z]+)*$/
    }).first()).toBeVisible();

    await expect(page.getByRole("heading",{
      name:/Available Theaters/
    }).first()).toBeVisible();

    await page.waitForSelector('movie-poster', { state: 'detached' })
    await expect(page.getByText("Selected Date: "+format(new Date(), "MMMM d, yyyy"))).toBeVisible();

  })

  test("should render theater cards on clicking date",async ({page}) => {
    const dateBtn = await page.locator(".date-btn").nth(0);
    await dateBtn.click();
    await page.waitForTimeout(1000);

    const theaterCardsCount = await page.locator(".theater-card").count();
    if(theaterCardsCount > 0){
      console.log(theaterCardsCount)
      const theater = await page.locator(".theater-card").first();
      
      const timeBtns = await theater.locator(".timeBtn").count();
      if(timeBtns > 0){
        const timeBtn = await theater.locator(".timeBtn").first();
        await timeBtn.click();
      }
      
      await page.waitForTimeout(1000);
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/^http:\/\/localhost:5173\/seats\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    }
    else{
      expect(await page.getByRole("heading",{
        name:"No Available Theaters"
      })).toBeVisible();
    }
    await page.waitForTimeout(1000)
    await expect(page.getByRole("heading",{
      name:"No Available Theaters"
    })).toBeVisible();
  })
})

test.describe("Seats Page",() => {
  test.beforeEach(async ({page}) => {
    new LoginPage(page).userLogin();
    await page.waitForURL((url) => url.toString().includes('/movies'));
    await page.goto("http://localhost:5173/seats/d48e6bd0-2f1c-494f-9f25-455cc006af78")
  })

  test("should contain correct data",async ({page})=> {
    if(await page.getByRole("heading",{
      name:"Oops! Not a valid Movie Id"
    }).count() <= 0){

    await expect(page.getByRole("heading",{
      name:"Select Your Seats"
    })).toBeVisible();

    await expect(page.getByRole("heading",{
      name:"Front Section"
    })).toBeVisible();

    await expect(page.getByRole("heading",{
      name:"Back Section"
    })).toBeVisible();

    await expect(page.getByRole("button",{
      name:"Confirm Selection"
    })).toBeVisible();

    await expect(await page.getByRole("button",{
      name: /^([1-9][0-9]?|100)$/i 
    }).count()).toBe(100)

  }
  })

  test("should redirect to bookins page after clicking on seat",async ({page}) => {
    if(await page.getByRole("heading",{
      name:"Oops! Not a valid Movie Id"
    }).count() <= 0){
    const seatBtn = await page.getByTestId("seat6");
    await seatBtn.click();
    await expect(page.getByText("₹150")).toBeVisible();

    const confirmBtn = await page.getByRole("button",{
      name:"Confirm Selection"
    })

    await confirmBtn.click();
    await expect(page.getByText("Message")).toBeVisible();
    await expect(page.getByText("Movie Booked successfully")).toBeVisible();
    await page.getByTestId("closeAfterBookingBtn").click(); 
    // await page.waitForNavigation();
    await page.waitForTimeout(1000);
    const pageUrl = await page.url();
    expect(pageUrl).toBe("http://localhost:5173/bookings");
  }
  })
})

test.describe("Bookings Page",() => {
  test.beforeEach(async ({page}) => {
    new LoginPage(page).userLogin();
    await page.waitForURL((url) => url.toString().includes('/movies'));
    await page.goto("http://localhost:5173/bookings")
  })

  test("shold contain correct data",async ({page}) => {
    if(await page.getByRole("heading",{
      name:"You have no current bookings."
    }).count() <= 0){
    await expect(await page.getByRole("heading",{
      name:"Your Booked Movies"
    })).toBeVisible();

    await page.waitForSelector('.booking-card');
    const bookingCards = await page.locator(".booking-card")
    if(await bookingCards.count() > 0){
      const firstCard = bookingCards.first();
      await expect(firstCard.getByRole("heading",{
        name:"Hanu Man"
      })).toBeVisible();

      await expect(firstCard.getByRole("button",{
        name:"Cancel Booking"
      })).toBeVisible();

      await expect(firstCard.getByText("Seats: 1")).toBeVisible();
      await expect(firstCard.getByText("Total Price: $120")).toBeVisible();
    }
    else{
      await expect(page.getByText("You have no current bookings.")).toBeVisible();
    }
  }
  })

  test("should cancel movie on clicking cancel button",async ({page}) => {
    if(await page.getByRole("heading",{
      name:"You have no current bookings."
    }).count() <= 0){
    const bookingCardsCount = await page.locator(".booking-card").count();
    if(bookingCardsCount >= 0){
    await page.getByText("Cancel Booking").first().click();
    await expect(page.getByText("Confirm")).toBeVisible();
    await expect(page.getByText("Do you want to cancel the ticket ?")).toBeVisible();
    const confirmBtn = await page.getByRole("button",{
      name:"Yes"
    });
    await expect(confirmBtn).toBeVisible();

    await confirmBtn.click();
    await page.waitForTimeout(1000);
    await expect(await page.locator(".booking-card").count()).toBe(bookingCardsCount - 1);
  }
}
  })
})

test.describe("Publish Movie Page",() => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    loginPage.publisherLogin();
    await page.waitForURL(url => url.toString().includes("publishedMovies"));
    await page.goto("http://localhost:5173/publishMovie");
  })

  test("should have correct meta data and elements", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Add Movie",
      })
    ).toBeVisible();

    await expect(page.getByPlaceholder("choose movie")).toBeVisible();
    await expect(page.getByPlaceholder("Enter price")).toBeVisible();
    await expect(page.getByPlaceholder("publish-date")).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Add Movie",
      })
    ).toBeVisible();

    const checkBoxes = await page.getByRole("checkbox")
    await expect(await checkBoxes.count()).toBe(5);

  });

  test("should publish a movie on when form is filled successfully",async ({page}) => {
    const movieBox = await page.getByPlaceholder("choose movie");
    await movieBox.fill("The Spider of Spiderweb Canyon");

    await page.waitForTimeout(2000)
    await movieBox.press("ArrowDown");
    await movieBox.press("Enter");

    await page.getByPlaceholder("Enter price").fill("120");
    await page.getByPlaceholder("publish-date").fill("2024-09-25");

    const checkBoxes = await page.getByRole("checkbox")
    await checkBoxes.nth(2).click();
    await checkBoxes.nth(3).click();
    await checkBoxes.nth(4).click();

    await page.getByRole("button",{
      name:"Add Movie"
    }).click();

    await page.waitForTimeout(2000);
    await expect(page.getByText("Successfully Added show!")).toBeVisible();
  })
})

test.describe("Published Movies Page",() => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    loginPage.publisherLogin();
    await page.waitForURL(url => url.toString().includes("publishedMovies"));
  })

  test("should contain correct data", async ({page}) => {
    await expect(await page.getByRole("heading",{
      name:"Published Movies"
    })).toBeVisible();

    await page.waitForSelector("table");

    const table = await page.locator('table');

    const columns = await table.locator('th[scope="col"]');
    await expect(await columns.count()).toBe(5);
  
    const expectedHeaders = ['Movie Name', 'Date', 'Time', 'Price', 'Action'];
    for (let i = 0; i < expectedHeaders.length; i++) {
      await expect(await columns.nth(i).textContent()).toBe(expectedHeaders[i]);
    }
  })

  test("shold delete movie details on clicking cancel button from table", async({page}) => {
    await page.waitForTimeout(1000)
    const cancelBtns = await page.locator(".cancelBtn");
    const cancelBtnsCount = await cancelBtns.count();

    await cancelBtns.first().click();
    await page.waitForTimeout(1000) 
    await expect(await page.locator(".cancelBtn").count()).toBe(cancelBtnsCount - 1)
  })


})
