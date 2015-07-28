# rmnd.in
A small project with the goal of creating a fast and easy way of scheduling email reminders for yourself.

## Setting up for Development

### Set up the Environment
1. Install virtualenvwrapper
1. Install postgresql & libpq-dev
1. `$ mkvirualenv rmndin`
1. `$ pip install -r requirements.txt`

### Set up the Database
1. Create posgres database
1. Add a user with limited permissions
1. Give the user a password
1. Grant user all privileges on database

### Finish Setup
1. `$ python manage.py migrate`
1. `$ python manage.py createsuperuser`

## TODO
Fundamentals
- [ ] Add flash/toastr messages
- [ ] Redis/Celery Email Scheduling
- [ ] Cron jobs to run through celery tasks
- [ ] Permalink (/reminders/:id/) for reminder details
- [ ] Time selection (by hour)
- [x] Registration Functionality

Nice-to-haves
- [ ] Categories
- [ ] Repeat reminders
- [ ] Multiple reminder times for single task
- [ ] Custom design
