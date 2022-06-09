# Gramoday

## Description:-

I have used the following npm modules to make this API-
1. express
2. body-parser
3. ejs
4. mongoose
5. uuid

The MongoDB database runs on localhost: 27017 and it is called reportsDB.

The API server runs on localhost:3000.

## How to use the API :-

You will need the Postman app to test my API

**POST request**

1. Open the Postman app.
2. Click on the plus button on the right side of overview to start making new requests
3. Select the POST option
4. enter **localhost:3000/reports** for the url.
5. Click on the Body tab just below the entered url.
6. Select the x-www-form-urlencoded option.
7. Now enter the following KEYs. (note: write these exactly like I have written below (case sensitive).)<br/>
   userID<br/>
   marketID<br/>
   marketName<br/>
   cmdtyID<br/>
   marketType<br/>
   cmdtyName<br/>
   priceUnit<br/>
   convFctr<br/>
   price<br/>

8. Now enter the values for these keys. (note: If a value is not present for a KEY leave it blank)
9. Click on the Send button.
10. Now you should be able to see status: "success" and a reportID in the response section of the app
11. The POST request is now complete and the data is stored in the reportsDB Database.

**GET request**

1. Now select the GET option in the app instead of POST.
2. enter **localhost:3000/reports?reportID=(enter the reportID of the report you want here)** for the url.
3. Click on the Send button.
4. Now you should be able to see the Aggregate report in the response section of the app.
5. The GET request is complete now.

----END----
