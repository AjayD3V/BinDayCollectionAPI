# BinDayCollectionAPI

BinDayCollectionAPI is a simple Express-based API that retrieves bin collection schedules based on the provided postcode. It calls an external API to get the bin collection information and parses the HTML response to extract relevant data.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the server.

## Usage

To use the API, make a GET request to `/bin-collection` with the `postcode` query parameter.

Example:

GET http://localhost:3000/bin-collection?postcode=WV4 6JT

Response:

```json
[
  {
    "order": 1,
    "binType": "General Waste",
    "day": "Wednesday",
    "nextDate": "July 31, 2024"
  },
  {
    "order": 2,
    "binType": "Recycling Waste",
    "day": "Wednesday",
    "nextDate": "August 07, 2024"
  }
]