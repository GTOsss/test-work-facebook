import {
  FBGet,
  FBGetLoginStatus,
  testResponse,
} from '../../services/facebook';
import {
  getLocalStorage,
  setLocalStorage,
} from '../../services/local-storage';
import {
  GET_USER_SUCCESS,
  GET_LOGIN_STATUS,
  INIT,
  TOGGLE_LOADING,
  LOAD_ANSWERS_SUCCESS,
} from '../constans/index';

const answers = 'answers';

export const getLoginStatus = () => async (dispatch) => {
  try {
    const loginStatus = await FBGetLoginStatus();

    dispatch({
      type: GET_LOGIN_STATUS,
      loginStatus,
    });
  } catch (e) {
    console.error('getLoginStatus', e);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const user = await FBGet('/me?fields=id,name');
    const userImg = await FBGet('me/picture?height=200');
    dispatch({
      type: GET_USER_SUCCESS,
      user: {
        name: user.name,
        id: user.id,
        userImg: userImg.data.url,
      },
    });
    dispatch({
      type: TOGGLE_LOADING,
      loadingObj: { user: false },
    });
  } catch (e) {
    console.error('loadUser', e);
  }
};

export const init = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { loginStatus: true, user: true },
  });

  const FBinit = (d, s, id) => {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    const FBElement = d.createElement(s);
    FBElement.id = id;
    FBElement.src = 'https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.10&appId=1603250586384390';
    fjs.parentNode.insertBefore(FBElement, fjs);

    window.fbAsyncInit = () => {
      dispatch({
        type: INIT,
        init: { FB: true },
      });

      FB.init({
        appId: '1603250586384390',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.10',
      });

      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          dispatch({
            type: GET_LOGIN_STATUS,
            loginStatus: response,
          });
          dispatch({ type: TOGGLE_LOADING, loadingObj: { loginStatus: false } });
          loadUser()(dispatch);
        } else {
          dispatch({
            type: TOGGLE_LOADING,
            loadingObj: { loginStatus: false },
          });
        }
      });

      FB.AppEvents.logPageView();
    };
  };

  FBinit(document, 'script', 'facebook-jssdk');
};

export const login = () => async (dispatch) => {
  FB.login((response) => {
    testResponse(response);
    loadUser()(dispatch);
    dispatch({
      type: GET_LOGIN_STATUS,
      loginStatus: response,
    });
  });
};

export const saveAnswer = values => async (dispatch, getState) => {
  const id = getState().user.id;
  const userImg = getState().user.userImg;
  const answer = {
    id,
    userName: values.userName,
    countFriend: +values.isCome === 1 ? values.countFriend || 0 : 0,
    isCome: values.isCome,
    userImg,
  };

  let answersFromLS = getLocalStorage(answers) || [];
  answersFromLS = answersFromLS.filter(el => el.id !== id);
  setLocalStorage(answers, [answer, ...answersFromLS]);
};

export const loadAnswers = () => async (dispatch) => {
  dispatch({
    type: LOAD_ANSWERS_SUCCESS,
    answers: getLocalStorage(answers),
  });

  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { answer: false },
  });
};

export const deleteAnswer = () => async (dispatch, getState) => {
  const id = getState().user.id;
  let answersFromLS = getLocalStorage(answers);
  answersFromLS = answersFromLS.filter(el => el.id !== id);
  setLocalStorage(answers, answersFromLS);
  dispatch({
    type: LOAD_ANSWERS_SUCCESS,
    answers: answersFromLS,
  });
};
