#!/bin/bash

curl -v --location --request POST 'http://hydra.local:8000/dea02a36-ffeb-11ec-b939-0242ac120002/api/v3/store/write' \
	--header 'X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "commands": [{
      "method": "upsert",
      "collection": "status",
      "id": "'$2'",
      "value": {
        "isDeleted": false,
        "tail_number": "'$2'",
        "status": '$1'
      }
    }]
  }'
