
import * as ActionTypes from './ActionTypes';

export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};



export const Forms = (state = { errMess: null, feedback:[]}, action) => {
  switch (action.type) {
    // case ActionTypes.ADD_FEEDBACKS:
    //   return {...state, errMess: null, comments: action.payload};
    // 
    // case ActionTypes.COMMENTS_FAILED:
    //   return {...state, errMess: action.payload};

    case ActionTypes.ADD_FEEDBACK:
        var feedback = action.payload;
        // comment.id = state.comments.length;
        // comment.date = new Date().toISOString();
        return { ...state, feedback: state.feedback.concat(feedback)};

    default:
      return state;
  }
};