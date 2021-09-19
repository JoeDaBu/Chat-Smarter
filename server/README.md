# Server

This is a backend API which uses Cockroach Cloud Database to store the trip planning from the conversation and landmark image classification results from Tinyverse Rune 

## Before running the Server

You need to have Python 3.7^

`pip install -r requirements.txt`

Follow the steps from https://hotg.dev/docs/get_rune to installtools to build rune

Create a cloud cluster from Cockroach

`export DB_URL_STRING='Your_Cockroach_Database_URL'`

Then initialize the Cockroach databse by following the steps from https://www.cockroachlabs.com/docs/stable/build-a-python-app-with-cockroachdb-django.html

`python3 manage.py makemigrations`

`python3 manage.py migrate`

`python3 manage.py runserver`

## After running the server

You can send the request to the server in order to classify the image from Firebase Storage

`curl --header "Content-Type: application/json" --request POST --data '{"key": "place.png", "result": ""}' http://127.0.0.1:8000/runeresult/`

Then you will receive the response where the result is the location

`{"id": "6d9f4e05-d5af-4909-8c99-a0efa16962a1", "key": "575.png", "result": "Rif"}`
