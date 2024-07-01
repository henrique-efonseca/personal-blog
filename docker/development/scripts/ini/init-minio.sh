#!/bin/sh

# Script to initialize MinIO

# Wait for MinIO to start
sleep 10

# Create buckets
mc alias set myminio http://localhost:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD
mc mb myminio/your-bucket-name
