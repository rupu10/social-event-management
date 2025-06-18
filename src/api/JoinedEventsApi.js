export const myJoinedEventsPromise = (email,accessToken) => {
    return fetch(`http://localhost:7000/joinEvents?email=${email}`,{
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res=>res.json())
}