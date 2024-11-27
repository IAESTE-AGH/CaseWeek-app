docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate -i /local/src/api/api-docs.yaml -g typescript-axios -o /local/src/api/  --additional-properties=withInterfaces=true

