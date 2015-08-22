# rmnd.in
A small project with the goal of creating a fast and easy way of scheduling email reminders for yourself.

## Setting up for Development

### Set up the Environment
1. Install virtualenvwrapper
1. Install postgresql & libpq-dev
1. `$ mkvirualenv rmndin`
1. `$ pip install -r requirements.txt`
1. Install npm
1. `$ sudo npm install gulp bower -g`
1. `$ sudo npm install` to add dependencies to node_modules
1. `$ gulp`

### Set up the Database
1. Create posgres database
1. Add a user with limited permissions
1. Give the user a password
1. Grant user all privileges on database

### Finish Django Setup
1. `$ python manage.py migrate`
1. `$ python manage.py createsuperuser`

### Set Up Task Queue
1. `$ sudo apt-get install rabbitmq-server`
1. Start celery worker with Beat `celery -A rmndin worker -B`

### Environment Variables
1. `vim ~/.virtualenvs/venvname/bin/postactivate`
1. Add:

```
export DJANGO_SENDGRID_USER='sendgrid_username'
export DJANGO_SENDGRID_PASSWORD='sendgrid_password'
```

### Dependencies
1. Install npm then `$ npm install` from project root
1. Run `$ gulp` to install dependencies, compile styles, and start watching

## TODO
Fundamentals
- [ ] Reminder component menu with Angular
- [ ] Show reminder priority (with color)
- [ ] User info/settings page (Full Name, Phone, etc...)
- [ ] Email activation
- [ ] Password Reset
- [ ] Create and use Reminder Service
- [ ] Server response form validation
- [x] Custom Login, Signup and Compose forms
- [x] Only let users choose a date in the future
- [x] Separate unsent reminders from completed in UI
- [x] Add filter for humanized time-to-reminder
- [x] Add page switch animations
- [x] JWT token refresh
- [x] Add flash/toastr messages
- [x] Permalink (/reminders/:id/edit) for reminder edit
- [x] Task Queue for emails
- [x] Add reminders to queue in collect_reminders
- [x] Celery Beat Scheduler to collect reminders to email
- [x] Client-side orm validation
- [x] Time selection (by hour)
- [x] Registration Functionality

Nice-to-haves
- [ ] Multiple reminder types (Email, Text, Tweet?)
- [ ] Categories
- [ ] Repeat reminders
- [ ] Multiple reminder times for single task
- [x] Add priority (High, Medium, Low)
