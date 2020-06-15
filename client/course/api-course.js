
const create = async (params, Credentials, course) => {
    try{
        let response = await fetch('/api/courses/by/' + params.userId,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + Credentials.t
            },
            body: course
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

const listByInstructor = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/courses/by/'+params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

export default { create, listByInstructor}