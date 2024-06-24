const initialState = 'MUSTAFA'; // Initial state is an empty array

let Chat = (state = initialState, action) => {
    if (action.type === "msg") {
        console.log("read",action.payload)
        return state = action.payload;
    }
    else {
        return state;
    }
}


export {Chat};