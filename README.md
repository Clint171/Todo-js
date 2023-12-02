# Masterplanner
Task manager for all your needs.

~ Big improvements coming soon...

View the current Todo site [here](https://clints-todo.onrender.com).

New api available at [masterplanner.onrender.com](https://masterplanner.onrender.com)


## Contents
* [Api Usage](#api-usage)
    * [Account](#account)
        * [Signing up](#signing-up)
        * [Verifying email](#verifying-email)
        * [Logging in](#logging-in)
    * [Tasks](#tasks)
        * [Creating tasks](#creating-tasks)
        * [Getting tasks](#getting-tasks)
        * [Updating tasks](#updating-tasks)
        * [Deleting tasks](#deleting-tasks)
    * [Groups](#groups)
        * [Creating groups](#creating-groups)
        * [Getting groups](#getting-groups)
        * [Updating group information](#updating-group-information)
        * [Deleting groups](#deleting-groups)
* [Contribution](#contribution)

## Api Usage

All requests are made to `https://masterplanner.onrender.com`

### Account

#### Signing up

To create an account , send a `POST` request to the route `/signup`

The request body should have the following <b>REQUIRED</b> fields : 
* `firstName` - A string of the user's first name
* `lastName` - A string of the user's last name
* `defaultEmail` - The default account email address. For the account to be verified, an email will be sent to this address.
* `password` - The account password (Set a strong and memorable password)

You can also add the following extra details for a better user experience :
* `otherNames` - A string of any other names of the user.

By default the account is free , and visibility is set to public for the account. This can be changed later.

Once the account is created, you will get the new user id and full names as an object with attributes `id` and `fullName` as a response.

#### Verifying email

Once you sign up, an email is sent to the user account's default email. Follow the instructions on the email to verify the account. Once the account is verified, you can log in to get a bearer token.

#### Logging in

To log in , send a `POST` request to `/login` with the following body :
* `email` - The default email of the account
* `password` - The account password

If the email and password match, you will get an object response with a `token`. This token is a bearer token.

In all subsequent requests, you will need to attach the bearer token to the header as authorization , for example :
```
let fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token,
        }
    };

fetch("https://masterplanner.onrender.com/tasks" , fetchOptions).then(data =>{
    //Do some stuff
});
```
### Tasks

To get all tasks for the currently logged in user , make a `GET` request to `/tasks`

This will return an array of task objects.

#### Creating tasks

#### Getting tasks

#### Updating tasks

#### Deleting tasks

### Groups

#### Creating groups

#### Getting groups

#### Updating group information

#### Deleting groups

## Contribution
All contributions are very welcome as this project needs all the help we can get.

If you would like to contribute, please read [this](CONTRIBUTING.md) first.