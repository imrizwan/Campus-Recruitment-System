import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_COMPANY_PROFILES,
  PICTURE,
  DELETE_EDUCATION,
  DELETE_LANGUAGE,
  DELETE_PROJECT,
  DELETE_EXPERIENCE,
  DELETE_ACTIVITIES,
  DELETE_PROJECT_COMPANY,
  DELETE_VACCANCY,
  GET_CANDIDATES
} from "../Variables";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_COMPANY_PROFILES:
      return {
        ...state,
        companyprofiles: action.payload,
        loading: false
    };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case PICTURE:
      return {
        ...state,
        picture: action.payload
      };
    case DELETE_EDUCATION:
      return {
        ...state,
        deleteducation: action.payload
      };
    case DELETE_LANGUAGE:
      return {
        ...state,
        deletelanguage: action.payload
      };
    case DELETE_PROJECT:
      return {
        ...state,
        deleteproject: action.payload
      };
    case DELETE_EXPERIENCE:
      return {
        ...state,
        deleteexperience: action.payload
      };
    case DELETE_ACTIVITIES:
      return {
        ...state,
        deleteactivities: action.payload
      };
    case DELETE_PROJECT_COMPANY:
      return {
        ...state,
        deleteprojectcompany: action.payload
      };
    case DELETE_VACCANCY:
      return {
        ...state,
        deletevaccancy: action.payload
      };
    case GET_CANDIDATES:
      return {
        ...state,
        getcandidates: action.payload
      };
    default:
      return state;
  }
}
