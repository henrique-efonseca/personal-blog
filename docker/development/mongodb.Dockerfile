FROM mongo:latest

ENV MONGO_REPLICA_HOST=127.0.0.1
ENV MONGO_REPLICA_PORT=27017
ENV MONGO_COMMAND=mongosh

# Start MongoDB in replica set mode and initiate the replica set
ENTRYPOINT ["/bin/sh", "-c", "\
  mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & \
  MONGOD_PID=$!; \
  INIT_REPL_CMD='rs.initiate({ _id: \"rs0\", members: [{ _id: 0, host: \"$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT\" }] })'; \
  until ($MONGO_COMMAND admin --port $MONGO_REPLICA_PORT --eval \"$INIT_REPL_CMD\"); do sleep 1; done; \
  echo \"REPLICA SET ONLINE\"; \
  wait $MONGOD_PID; \
"]
