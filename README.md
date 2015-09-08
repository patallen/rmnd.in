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
1. For development, run `$ gulp bdev`
1. For production, run `$ gulp build-release`

### Testing
1. `$ sudo npm install -g karma`
1. `$ karma start`

## TODO
Fundamentals
- [ ] Email activation with new user Model
- [ ] Change user info (Email? username, first/last name, phone?)
- [x] Custom user model
- [x] Change password while logged in
- [x] Add pause reminder functionality
- [x] Display message when user doesn't have reminders
- [x] Password Reset
- [x] Add homepage
- [x] Custom Time Picker
- [x] Datepicker directive
- [x] Figure out response/err handling for ReminderService
- [x] Menu based on reminder instead of $index
- [x] Proper icons for reminder status
- [x] Main nav dropdown (logout, settings...)
- [x] Show reminder priority (with color)
- [x] Create and use Reminder Service
- [x] Reminder component menu with Angular
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
