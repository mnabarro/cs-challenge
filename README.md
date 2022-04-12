# Code Sherpas Backend challenge

## Comments on the project
Although it is a simple project, it has allowed me to put into practice what I learned about NodeJs, such as structuring a typical API backend application, validations, etc...

This project has allowed me to confirm my preference for the backend.I have really enjoyed developing it.
I will continue to learn related technologies and tools that allow me to improve my performance and grow as a developer.

It has also given me the opportunity to learn about testing, Github actions, and markdown syntax. I hope my solution is up to the requirement.

## How to run test suite
Open a terminal window. Chdir to the project's folder, run: 

#### *npm test*

Test suite includes one test for each endpoint of this API.
 - Get all customers
 - Insert one customer
 - Get created customer
 - Search customer by email
 - Modify customer
 - Delete customer

## Running the app
Open a terminal window. Chdir to the project's folder

### Directly with npm ( Needs Node installed )
Run:
#### *npm start*

### Docker container with the app ( Needs docker & docker-compose installed )
Run:
#### *docker-compose up --build*

## Endopoint description:
*Assuming the project is running as delivered*

- #### List all customers
    **GET** http://localhost:3100/api/customers 

```javascript
// Example response for GET http://localhost:3100/api/customers
{
    "status": "200 OK",
    "count": 2,
    "data": [
        {
            "id": 1,
            "name": "Jocelyn",
            "surName": "Schuster",
            "email": "brickeardn@fema.gov",
            "birthDate": "1966-06-02T00:00:00.000Z"
        },
        {
            "id": 2,
            "name": "Edwina",
            "surName": "Ernser",
            "email": "dfundello@amazon.co.jp",
            "birthDate": "2000-09-28T00:00:00.000Z"
        }
    ]
}
```

- #### Details of a customer (by Primary Key)
    **GET** http://localhost:3100/api/customers/:id

```javascript
// Example response for GET http://localhost:3100/api/customers/1
{
    "status": "200 OK",
    "data": {
        "id": 1,
        "name": "Jocelyn",
        "surName": "Schuster",
        "email": "brickeardn@fema.gov",
        "birthDate": "1966-06-02T00:00:00.000Z"
    }
}
```

- #### Search for a customer ( by name, surName or email )
    **GET** http://localhost:3100/api/customers/search/:lookFor

```javascript
// Example response for GET http://localhost:3100/api/customers/search/com
{
    "status": "200 OK",
    "count": 2,
    "data": [
        {
            "id": 4,
            "name": "Kody",
            "surName": "Terry",
            "email": "xisherwoodr@ask.com",
            "birthDate": "1979-01-09T00:00:00.000Z"
        },
        {
            "id": 5,
            "name": "Macy",
            "surName": "Greenfelder",
            "email": "jissetts@hostgator.com",
            "birthDate": "1976-09-07T00:00:00.000Z"
        }
    ]
}
```
- #### Create a new customer
    **POST** http://localhost:3100/api/customers

    You need to provide an object with _at least_ { name, surName, email } values.
    If any of the mandatory fields is not present in the request, the API responses with an 400 error code and a short description of the problem.
```javascript
// Example response for POST to http://localhost:3100/api/customers with complete object definiton.
{
	"status": "201 Created",
	"data": {
		"name": "Matias",
		"surName": "Nabarro",
		"email": "matias@nabarro.com",
		"birthDate": "1977-11-17"
	}
}
```

```javascript
// Example response for POST to http://localhost:3100/api/customers with incomplete object definiton.
{
	"status": "400 Bad Request",
	"message": "notNull Violation: Customers.surName cannot be null,\nnotNull Violation: Customers.email cannot be null"
}
```

- #### Update field(s) of an existing customer
    **PUT** http://localhost:3100/api/customers/:id

    You need to provide an object with the field-value pair(s) to be modified.
    If a non-existing customer id is provided, the API responses with a 404 error.

```javascript
// Example response for PUT to http://localhost:3100/api/customers/7
{
	"status": "200 OK",
	"data": {
		"id": 7,
		"name": "Matias",
		"surName": "Nabarro",
		"email": "matias@gmail.com",
		"birthDate": "1977-11-17T00:00:00.000Z"
	}
}
```
```javascript
// Example response for PUT to http://localhost:3100/api/customers/44
{
	"status": "404 Not Found",
	"id": "44"
}
```

- #### Deletes an existing customer
    **DELETE** http://localhost:3100/api/customers/:id

    You need to provide an exisiting customer's id.
    If a non-existing customer id is provided, the API responses with a 404 error.

```javascript
// Example response for DELETE to http://localhost:3100/api/customers/6
{
	"status": "200 OK",
	"id": "6"
}
```
```javascript
/* Example response for DELETE to http://localhost:3100/api/customers/9
   (non-existing customer id) */
{
	"status": "404 Not Found",
	"id": "9"
}
```
