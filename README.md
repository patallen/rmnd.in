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
1. `$ python manage.py crontab add`

### Set Up Task Queue
1. `$ sudo apt-get install rabbitmq-server`
1. Start celery worker: `$ celery -A rmndin worker -l info`

### Environment Variables
1. `vim ~/.virtualenvs/venvname/bin/postactivate`
1. Add:

'''
export DJANGO_SENDGRID_USER='sendgrid_username'
export DJANGO_SENDGRID_PASSWORD='sendgrid_password'
'''

## TODO
Fundamentals
- [ ] Task Queue for emails 
- [ ] Add reminders to queue in collect_reminders
- [ ] Create custom app layout
- [ ] Add flash/toastr messages
- [ ] Permalink (/reminders/:id/) for reminder details (maybe not)
- [ ] Server response form validation
- [x] Cron jobs to collect reminders to email 
- [x] Client-side orm validation
- [x] Time selection (by hour)
- [x] Registration Functionality

Nice-to-haves
- [ ] Categories
- [ ] Repeat reminders
- [ ] Multiple reminder times for single task
- [ ] Custom design
