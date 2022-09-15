import { check } from "k6"
import http from "k6/http"
import aws4 from "./aws4.js"

const awsKey = ""
const awsSecretKey = ""
const awsSessionToken = ""

export default function () {
    const serviceName = "execute-api"
    const baseUrl = "some_domain.com"
    const path = "/api/v1/sampleEndpoint"
    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        service: serviceName
    }
    const parts = path.split("?")
    options.host = baseUrl
    options.path = path
    options.region = "ap-northeast-1"
    options.method = "GET"

    aws4.sign(options, {
        accessKeyId: awsKey,
        secretAccessKey: awsSecretKey,
        sessionToken: awsSessionToken
    })

    const res = http.get(`https://${baseUrl}${path}`, {headers: options.headers})
    check(res, {
        'is_status_200': (r) => r.status === 200
    })
}