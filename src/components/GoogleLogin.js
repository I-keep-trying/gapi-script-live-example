import React, { useState, useEffect } from 'react'
import { gapi, loadAuth2 } from 'gapi-script'

import { UserCard } from './UserCard'
import './GoogleLogin.css'

export const GoogleLogin = () => {
  const [user, setUser] = useState(null)
  console.log('user', user, '!user', !user)
  useEffect(() => {
    console.log('useEffect1')
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        process.env.REACT_APP_GOOGLE_CLIENT_ID,
        ''
      )
      if (auth2.isSignedIn.get()) {
        updateUser(auth2.currentUser.get())
      } else {
        attachSignin(document.getElementById('customBtn'), auth2)
      }
    }
    setAuth2()
  }, [])

  useEffect(() => {
    console.log('useEffect2', !user)
    if (!user) {
      const setAuth2 = async () => {
        const auth2 = await loadAuth2(
          gapi,
          process.env.REACT_APP_GOOGLE_CLIENT_ID,
          ''
        )
        attachSignin2(document.getElementById('customBtn'), auth2)
      }
      setAuth2()
    }
  }, [user])

  const updateUser = (currentUser) => {
    const name = currentUser.getBasicProfile().getName()
    const profileImg = currentUser.getBasicProfile().getImageUrl()
    setUser({
      name: name,
      profileImg: profileImg,
    })
  }

  const attachSignin = (element, auth2) => {
    console.log('attachSignin')
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser)
      },
      (error) => {
        console.log(JSON.stringify(error))
      }
    )
  }

  const attachSignin2 = (element, auth2) => {
    console.log('attachSignin2')
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser)
      },
      (error) => {
        console.log(JSON.stringify(error))
      }
    )
  }

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      setUser(null)
      console.log('User signed out.')
    })
  }

  return user ? (
    <div className="container">
      <UserCard user={user} />
      <div id="" className="btn logout" onClick={signOut}>
        Logout
      </div>
    </div>
  ) : (
    <div className="container">
      <div id="customBtn" className="btn login">
        Login
      </div>
    </div>
  )
}
/* 
{access_token: "ya29.A0AVA9y1uFVa2_VeNIxrqIsgIGgg-MiSLD8cQKEBe-A4XlIojFtE_h-a0ysDD1LkU2F8u2xGEYjC4fC0gGaVx9ZT02DfGMdxgBIk5wAfLMODJMOO3STfREe-nc42B8KQMDHeDXgpwXt-7KW0k-wtthEHmpSfl95waCgYKATASATASFQE65dr8QSvBoTWoP9QIK_Gr4pD5Ww0165"
expires_in: 3599
id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1NDllMGFlZjU3NGQxYzdiZGQxMzZjMjAyYjhkMjkwNTgwYjE2NWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTU3NTY0MzE4OTUyLXBpZzgwN3Y3OWtsY3A3b2tyN2t2dDBscHIwMGY1ZjMyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTU3NTY0MzE4OTUyLXBpZzgwN3Y3OWtsY3A3b2tyN2t2dDBscHIwMGY1ZjMyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzMTAwNjgyNTk0NDU2NzQ4NzY5IiwiZW1haWwiOiJkcmVjcmVnb0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ik1OM2ZINUhHTGFiR3ZITWx1UEJYVGciLCJuYW1lIjoiRHJlIENyZWdvIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BRmRadWNvM0JuOFdoeEItcVlIbExlN29lOHdnb1Z1c0ZtOUR1YVFtRy1kRT1zOTYtYyIsImdpdmVuX25hbWUiOiJEcmUiLCJmYW1pbHlfbmFtZSI6IkNyZWdvIiwibG9jYWxlIjoiZW4tR0IiLCJpYXQiOjE2NTk2Mjk1NDgsImV4cCI6MTY1OTYzMzE0OCwianRpIjoiM2YyMTRlZWM0ZjZlMmRlMTA2OTNmNzMzNzEzOTE0ZWU5NDM4ZDU5NCJ9.Iumbe7upGkYDOCCwkXVF1ODXuy5FMF1qQWwN2U5N4co526MgBUDY9v6vfcyvUB_IPWDon9wCQh9N4Xr2IAFbyMm3qInpsS5qlrygYLep7IBzUsAAbhacEkeQRt_tVxbL05xHx5Oq6Xdx9A69RFj90dHfwnLNwyrUVPAI_HxuHDZJExFai64JttRu0xwNpRdhvaZMG4nsIg3EGQ4pnQhfOpIXkbCgilWNYUCV4NIM6NISIIzQHX7jWa2_fqfDughTH551QxTvS8oIgH5uHqBj0En2NDer2zUVoHOFMRbYJDPJsQ8XM9U8WW3TsQg5RzKpiuOguWNCTcLBiIV3fZHBkg"
login_hint: "AJDLj6JEiYGwLjglw98uPmbMXtAGVq4Jt-ey3FcB9J1-1ekz1XnGoZQLaqhoTu3ByDCu1E3-keecDuHjb6FC1Vmltye2W2LOJE2Hx-bb_Ut8w6vgYEGrrgqdyfFoo_mIphhfRHvFHsjP"
scope: "email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email"
session_state: {extraQueryParams: {authuser: "0"}}
token_type: "Bearer"}

{access_token: "ya29.A0AVA9y1sW8BSpxphKpNYlob-lor_HOL2TmVVsbD1D40Pxjz6XTHGeJfKithfrrW9CVri33HimTlCvW8Zuh9-ULVTx83PIdtGuwz44tFXgD0hUINEOdPgFNgOUI0BZ8lqMMeB3DJobnD27PtAZVkk6eJjDE8_g_gYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4YmRrVXZsZTMxVzZIRGkyOExqcG1rUQ0165"
expires_in: 3599
id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1NDllMGFlZjU3NGQxYzdiZGQxMzZjMjAyYjhkMjkwNTgwYjE2NWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTU3NTY0MzE4OTUyLXBpZzgwN3Y3OWtsY3A3b2tyN2t2dDBscHIwMGY1ZjMyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTU3NTY0MzE4OTUyLXBpZzgwN3Y3OWtsY3A3b2tyN2t2dDBscHIwMGY1ZjMyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzMTAwNjgyNTk0NDU2NzQ4NzY5IiwiZW1haWwiOiJkcmVjcmVnb0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjViTjJTNHBOZG05dHJfV2h2bjlKaXciLCJuYW1lIjoiRHJlIENyZWdvIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BRmRadWNvM0JuOFdoeEItcVlIbExlN29lOHdnb1Z1c0ZtOUR1YVFtRy1kRT1zOTYtYyIsImdpdmVuX25hbWUiOiJEcmUiLCJmYW1pbHlfbmFtZSI6IkNyZWdvIiwibG9jYWxlIjoiZW4tR0IiLCJpYXQiOjE2NTk2Mjk4MDksImV4cCI6MTY1OTYzMzQwOSwianRpIjoiZjZiZGZkNWEzODYzYzdiNjIwNGUyNGJlZjU3YTU3NzdkMjI3ODUyNSJ9.sdUMPPk1BmSVNZiL6oVlNwC-0eay1fD6TheR84D1Prq8TFqErZpEnH0r9N3TFsb3_D7sNMfVUMIrry9pBjfVHA-mEHS-5Ifn7NV3hzw0nSR8vYriu5fI4yVoUMxBznwbOMy8NkYX5Y6vS8831_yTB_LIw8QXwJcoVnh88LwRJS4hsfsJfKqHXjhD4AJYf2AtG3rRHApDnQiTL6QVA2QQ0TASF6a93OeQDX8HXk-B9cX0jtaIf1dmFJ8zqjU0Pits4fvlbYvdHgA_60PEYQCcM9iLOKFaHPiPvk2mhng3HL5jFfN4vVLllXS4iU__d-0o_hOMjI1tkZhzyOeyAT-ULA"
login_hint: "AJDLj6JEiYGwLjglw98uPmbMXtAGVq4Jt-ey3FcB9J1-1ekz1XnGoZQLaqhoTu3ByDCu1E3-keecDuHjb6FC1Vmltye2W2LOJE2Hx-bb_Ut8w6vgYEGrrgqdyfFoo_mIphhfRHvFHsjP"
scope: "email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email"
session_state: {extraQueryParams: {authuser: "0"}}
token_type: "Bearer"}
*/