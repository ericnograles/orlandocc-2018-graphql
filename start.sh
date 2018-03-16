# Install dependencies
rm -rf /app/node_modules && yarn install

# Make sure everything shuts down when someone hits Ctrl + C
trap 'kill %1' SIGINT

# Run everything!
yarn run develop:api & yarn develop:client