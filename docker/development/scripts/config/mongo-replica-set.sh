#!/bin/sh

# Wait for MongoDB to start
sleep 10

# Check if the replica set is already initiated
RS_STATUS=$(mongosh --quiet --eval "rs.status().ok")

if [ "$RS_STATUS" != "1" ]; then
  # Run the replica set initiation command
  mongosh --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});"
else
  echo "Replica set already initiated."
fi

# Keep the container running
tail -f /dev/null
