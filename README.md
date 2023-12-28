# Masterplanner
Task manager for all your needs.

~ Big improvements coming soon...
frontend - [masterplanner](https://clint171.github.io/masterplanner)

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

#### Creating tasks

To create a task, send a `POST` request to `/tasks` with the following parameters in your request body :
* `title` - The task title
* `description` - The task description
* `dueDate` - The due date of the task, in UTC date format (Server deals with only UTC dates for consistency)
* `priority` - The level of importance of the task (can be `high` , `medium` , or `low`)
* `editors` - (Optional) An array containing the Ids of users who have edit permission on the task.
* `visibility` - Defines who can see the task (can be `public` , `private` , `editors`, or `group`)
* `parentTask` - (Optional) The task Id of the task that the task being created is a sub-task of. Omit this if not needed.

#### Getting tasks

To get all tasks for the currently logged in user , make a `GET` request to `/tasks`.

To get pending tasks , make a `GET` request to `/tasks/pending`

To get ongoing tasks , make a `GET` request to `/tasks/ongoing`

To get completed tasks , make a `GET` request to `/tasks/completed`

To get overdue tasks , make a `GET` request to `/tasks/overdue`

All these will return an array of task objects matching the query.
**Note :** this will only display the tasks that the user owns.

#### Updating tasks

To update a task, send a `PUT` request to `/tasks/{{taskId}}` where taskId is the id of the task being updated.

The request body should contain a JSON object with all the fields that are to be changed.

Once the task is updated, you will receive the updated task as a response.

**Note :** Only the task owner and editors can update a task, or edit it.

#### Deleting tasks

To delete a task , send a `DELETE` request to `/tasks/{{taskId}}` where taskId is the id of the task to delete.

Deleting a task will also delete all its subtasks. Deleted tasks cannot be retrieved, so be careful.

**Note :** Only the task owner can delete a task.

### Groups

#### Creating groups

To create a group, send a `POST` request to `/groups`

The request body should contain the following fields:
* `name` - The name of the group.
* `description` - The description of the group
* `members` - An array containing the ids of the members of the groups.

The following additional fields can be specified :
* `visibility` - A string defining visibility of the group. Accepted values : `public` , `private` , `editors` , `group`. If not specified, will default to `private`.
* `parentGroup` - Id of the parent group of this group.
* `joinCodeRequired` - boolean specifying if new members need a join code to join. Default is `false`.
* `acceptJoinRequests` - boolean specifying if the group accepts joining via requests. Defaults to `false` if not specified.
* `acceptJoinRequestsAutomatically` - boolean specifying if join requests should be accepted automatically. Defaults to `false` if unspecified.
* `acceptJoinCode` - boolean specifying if the group accepts joining via join codes. Will default to `true` if `joinCodeRequired` is true. If not specified, will default to `false`.
* `acceptJoinCodeAutomatically` - boolean specifying if the group should automatically add members who ask to join via join code. If not specified, will default to `false`.

**Note :** The creator of the group is automatically assigned as the owner.

#### Getting groups

To get the groups which the current user is a part of, send a `GET` request to `/groups`.

This will return an array of all groups which the user is an owner, admin, or member.

#### Updating group information

To edit a group's information, send a `PUT` request to `/groups/{{groupId}}` where `groupId` is the id of the group.

The request body should contain all the fields to be updated.

If the operation is successful, it will return the updated group.

**Note :** Only the group owner and admins can edit group information.

#### Adding and removing members

#### Adding and removing admins

#### Adding and removing parent groups

#### Deleting groups

To delete a group, send a `DELETE` request to `/groups/{{groupId}}` where `groupId` is the id of the group.

Once successful, an email will be sent to all the group members notifying them of the group's deletion.

**Note :** Only the group owner can delete a group.

## Contribution
All contributions are very welcome as this project needs all the help we can get.

If you would like to contribute, please read [this](CONTRIBUTING.md) first.
