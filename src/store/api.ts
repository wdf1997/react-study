const API = {
    getText: (params: any) => {
        return new Promise((resolve, reject) => {
            if (params.background === 'green') {
                resolve({
                    value: 'text1',
                    background: 'green'
                })
            } else if (params.background === 'yellow') {
                resolve({
                    value: 'text2',
                    background: 'yellow'
                })
            } else {
                resolve({
                    value: 'text3',
                    background: 'orange'
                })
            }
        })
    }
}
export default API