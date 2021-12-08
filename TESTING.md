Tthis application consists fo two sets of tests
1) Componenet testings
- These sets of test can be run using the command ``yarn test`` in /frontend to test "AvaliablityCard" component "Popup" component and "Homepage" renders
- For each component testings, I first test if the particular componenets renders correctly meaning if they consists of all the DOM elements they should have.
I then test for the behaviour of the component, these consists of checking function behaviours, checking input props and buttons interactions
2) For UI testing / functional testing
- I have writtern a happyPath test in /frontend/cypress/integration/happyPath
- The happy path tests aim to tests the average users flow can be carried out smoothyl without altering anything that is not visible or the need to modify url
- The happy path follow stricktly according to the happypath described in the assessment specs.
- For some reason I am able to run cypress on vlab, and vlab always wants me to reinstall cypress on every login. If that does happen, please just install cypress again before testing
- Once cypress is installed, please replace database.json in backend with the following before running cypress UI testing for the test, as the booking seciton would only be made possible if there is a existing published listing, and also prevents duplicate user sign up failture
{
  "users": {
    "admin": {
      "name": "admin",
      "password": "admin",
      "sessionActive": false
    }
  },
  "listings": {
    "671024538": {
      "title": "test",
      "owner": "admin",
      "address": "test",
      "price": "760",
      "thumbnail": "",
      "metadata": {
        "type": "test",
        "bath": 1,
        "bed": 1,
        "master": 1,
        "guest": 1,
        "amenities": "test"
      },
      "reviews": [],
      "availability": [
        {
          "start": "2021-11-18",
          "end": "2021-12-22"
        }
      ],
      "published": true,
      "postedOn": "2021-11-17T04:26:09.281Z"
    }
  },
  "bookings": {}
}