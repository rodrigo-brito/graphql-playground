import {
    Environment,
    Network,
    RecordSource,
    Store
} from "relay-runtime"

const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
    return fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer 19870b8a8017d30b258d550cf0134af619338c16"
        }),
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then((response: any): any => {
        return response.json()
    })
})

export const environment = new Environment({
    network,
    store,
});