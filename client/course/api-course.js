
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