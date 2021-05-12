# Node DB3 Project Starter Code

## Task 1: Project Setup

There are two possible ways to submit your project. Your instructor should have communicated which method to use for this project during the Guided Project and in your cohort's Slack channel. If you are still unsure, reach out to Lambda Staff.

### Option A - Codegrade

- [ ] Fork and clone the repository.
- [ ] Open the assignment in Canvas and click on the "Set up git" option.
- [ ] Follow instructions to set up Codegrade's Webhook and Deploy Key.
- [ ] Push your first commit: `git commit --allow-empty -m "first commit" && git push`.
- [ ] Check to see that Codegrade has accepted your git submission.

### Option B - Pull Request

- [X] Fork and clone the repository.
- [X] Implement your project in a `firstname-lastname` branch.
- [X] Create a pull request of `firstname-lastname` against your `main` branch.
- [X] Open the assignment in Canvas and submit your pull request.

## Task 2: Project Minimum Viable Product

### Database

Open `data/schemes.db3` using a graphical tool like SQLite Studio and study the data inside the `schemes` and `steps` tables. The data can be reset at any time by executing `npm run seed`.

### API

Open `api/schemes/scheme-router.js` and study the specification for each endpoint. You do not need to make any changes to this file.

- `[GET] /api/schemes`
- `[GET] /api/schemes/:scheme_id`
- `[GET] /api/schemes/:scheme_id/steps`
- `[POST] /api/schemes`
- `[POST] /api/schemes/:scheme_id/steps`

### Middleware Functions

Write middleware functions in `api/schemes/scheme-middleware.js` following the instructions inside that file:

- [ ] `checkSchemeId`
- [ ] `validateScheme`
- [ ] `validateStep`

### Database Functions

Write db access functions in `api/schemes/scheme-model.js` following the instructions inside that file:

- [ ] `find`
- [ ] `findById`
- [ ] `findSteps`
- [ ] `add`
- [ ] `addStep`

#### Schemes Schema

| field       | data type        | metadata                                      |
| :---------- | :--------------- | :-------------------------------------------- |
| scheme_id   | unsigned integer | primary key, auto-increments, generated by db |
| scheme_name | string           | required, unique                              |

#### Steps Schema

| field        | data type        | metadata                                           |
| :----------- | :--------------- | :------------------------------------------------- |
| step_id      | unsigned integer | primary key, auto-increments, generated by db      |
| scheme_id    | unsigned integer | foreign key referencing scheme.scheme_id, required |
| step_number  | unsigned integer | required                                           |
| instructions | string           | required                                           |

### Notes

- Run tests locally executing `npm test`.
- You are welcome to create additional modules but do not move or rename existing files or folders.
- Do not change your `package.json` file except to install additional libraries or add additional scripts.
- In your solution it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work.
- Perform basic professional polishing including spell-checking and grammar-checking on your work.

## Task 3: Multi Table Queries

Use a graphical tool like SQLite Studio to open `./data/northwind.db3` and execute the following queries:

(Write the queries inside `./queries.sql` under the corresponding comment)

- Display the ProductName and CategoryName for all products in the database. Returns 77 records.
- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Returns 429 records.
- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Returns 3 records.
- Display the OrderID, customer's Company Name and the employee's Last Name for every order. All columns should be labeled clearly. Returns 16,789 records.

## Task 4: Stretch Problems

In [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top):

- Find the number of shipments by each shipper.
- Find the top 5 best performing employees measured in number of orders.
- Find the top 5 best performing employees measured in revenue.
- Find the category that brings in the least revenue.
- Find the customer country with the most orders.
- Find the shipper that moves the most cheese measured in units.
