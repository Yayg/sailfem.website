#!/bin/sh
set -e

export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

echo "Applying database migrations..."
node_modules/.bin/prisma migrate deploy

echo "Seeding roles..."
node_modules/.bin/prisma db seed

echo "Starting server..."
exec node_modules/.bin/next start -p "${PORT:-3000}"
