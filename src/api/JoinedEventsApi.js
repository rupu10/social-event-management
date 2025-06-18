export const myJoinedEventsPromise = email => {
    return fetch(`http://localhost:7000/joinEvents?email=${email}`).then(res=>res.json())
}