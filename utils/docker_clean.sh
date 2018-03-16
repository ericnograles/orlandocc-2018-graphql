echo "Starting cleaning operation for dangling Docker Images and Volumes"

## Cleans all dangling images
docker rmi $(docker images -f dangling=true -q)

## Cleans all dangling volumes
docker volume rm $(docker volume ls -qf dangling=true)

echo "Finished cleaning operation for dangling Docker Images and Volumes"