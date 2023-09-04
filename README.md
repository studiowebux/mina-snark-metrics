# SNARK Metrics

Collect Snark data using the local graphQL API, returns the data as metrics to be consumed by prometheus Server.

## Prerequisites

- Snark Worker Node
- Exposed GraphQL endpoint
- Public Key of the block producer

## Usage

```bash
npm install

export PUBLIC_KEY="B62qpawLEW6N9v4PoZ4jVpPMbMnCN2Vd8qWEd1EFQSVt8wM7itfuzHw"
export ENDPOINT="http://localhost:3095/graphql"
npm run start
```

```
curl http://localhost:9999/metrics
```

### Advanced

**Available Environment Variables**
_Default Values:_

```bash
export PROMETHEUS_PORT=9999
export N_BLOCKS=100
export CONVERSION=1000000000
```

## Docker Usage

```bash
docker build -t snark-metrics .
docker run \
    -d \
    --restart=unless-stopped \
    --name snark-metrics \
    -p 9999:9999 \
    -e PUBLIC_KEY="B62qpawLEW6N9v4PoZ4jVpPMbMnCN2Vd8qWEd1EFQSVt8wM7itfuzHw" \
    --add-host=host.docker.local:host-gateway \
    -e ENDPOINT="http://host.docker.local:3095/graphql" \
    snark-metrics
```

```bash
docker logs snark-metrics
```

```bash
curl localhost:9999/metrics
```
