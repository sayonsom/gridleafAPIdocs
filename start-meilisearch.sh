#!/bin/bash

# Kill any existing MeiliSearch processes
pkill meilisearch

# Start MeiliSearch with the correct configuration
./meilisearch --master-key="masterKey" --env development 