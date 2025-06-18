export const myEventsPromise = (email,accessToken) => {
    return fetch(`http://localhost:7000/events?email=${email}`,{
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res=>res.json())

}