export const env = {
    API_BASE_URL: "apikey",
}

// Assert that .env variables are defined
for (const [key, value] of Object.entries(env)) {
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`)
    }
}
