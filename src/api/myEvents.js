export const myEventsPromise = email => {
    return fetch(`http://localhost:7000/events?email=${email}`).then(res=>res.json())

}