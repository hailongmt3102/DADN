all:
	python manage.py makemigrations
	python manage.py migrate
	python manage.py runserver

clean:
	rm -rf  db.sqlite3

pull:
	python manage.py pulldata --cycle 10

push:
	python manage.py makedata --cycle 10
