#!/bin/bash

curl --location --request POST 'https://09fcd60d-69d2-414d-bc66-9c2475077258.cloud.ditto.live/api/v3/store/write' \
	--header 'X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "commands": [{
      "method": "upsert",
      "collection": "status",
      "id": 99,
      "value": {
        "tail_number": "99",
        "status": '$1'
      }
    }]
  }' \
