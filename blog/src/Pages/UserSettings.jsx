import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { Sidebar } from "../Components/Sidebar";
import { UseUserContext } from "../Hooks/UseUserContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const UserSettings = () => {
  const [userData, setUserData] = useState();
  const [prevEmail, setPrevEmail] = useState("");
  const [prevName, setPrevName] = useState("");
  const [user_name, setUser_name] = useState("");
  const [user_password, setUser_password] = useState("");
  const [error, setError] = useState("");
  const [usernameModal, setUsernameModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [accDeleteConfirm, setAccDeleteConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [logoutMessage, setLogoutMessage] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [nameModal, setNameModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
 const url = import.meta.env.VITE_URL
  const { user, dispatch } = UseUserContext();

  const navigate = useNavigate();

  //   fetch user
  useEffect(() => {
    const setUser = async () => {
      const data = await user;
      setUserData(data);
    };
    setUser();
  }, [user]);

  //   fetch name and email
  useEffect(() => {
    const fetchName = async () => {
      const auth = await fetch(
        `${url}/api/user/profile/${user._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        },
      );
      const data = await auth.json();
      if (auth.ok) {
        setPrevName(data.user_firstname);
        setPrevEmail(data.user_email);
      }
    };
    fetchName();
  }, [user._id, user.token,url]);

  //   change username
  const changeUsername = async (e) => {
    e.preventDefault();
    const username = await user_name;
    const password = await user_password;
    setError(null);
    setErrorColor("");
    try {
      if (!username) {
        throw Error("Please enter username");
      }
      if (!password) {
        throw Error("Please enter password");
      }
      const response = await fetch(
        `${url}/api/user/profile/updateUsername`,
        {
          method: "PATCH",
          body: JSON.stringify({ password, username }),
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "LOGIN", payload: data });
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.user.username,
            token: data.token,
            userid: data.user.userid,
          }),
        );
        setLogoutMessage(
          `Username successfully changed. You will be logged out `,
        );
        setLogoutConfirm(!logoutConfirm);
      } else {
        setError(data);
        setErrorColor("error");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setErrorColor("error");
    }
  };

  //   change name
  const changeName = async (e) => {
    e.preventDefault();
    const newname = await name;
    const password = await user_password;
    setError(null);
    setErrorColor("");
    try {
      if (!newname) {
        throw Error("Please enter name");
      }
      if (!password) {
        throw Error("Please enter password");
      }
      const response = await fetch(
        `${url}/api/user/profile/updatename`,
        {
          method: "PATCH",
          body: JSON.stringify({ password, newname }),
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(`${data} `);
        setConfirm(!confirm);
      } else {
        setError(data);
        setErrorColor("error");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setErrorColor("error");
    }
  };

  //   change email
  const changeEmail = async (e) => {
    e.preventDefault();
    const newEmail = await email;
    const password = await user_password;
    setError(null);
    setErrorColor("");
    try {
      if (!newEmail) {
        throw Error("Please enter email");
      }
      if (!password) {
        throw Error("Please enter password");
      }
      const response = await fetch(
        `${url}/api/user/profile/updateEmail`,
        {
          method: "PATCH",
          body: JSON.stringify({ password, newEmail }),
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "LOGIN", payload: data });
        setLogoutMessage(
          `Email successfully changed. You will be logged out `,
        );
        setLogoutConfirm(!logoutConfirm);
      } else {
        setError(data);
        setErrorColor("error");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setErrorColor("error");
    }
  };
  //   change password
  const changePassword = async (e) => {
    e.preventDefault();
    const newPassword = await newpassword;
    const password = await user_password;

    setError(null);
    setErrorColor("");
    try {
      if (!newPassword) {
        throw Error("Please enter password");
      }
      if (!password) {
        throw Error("Please enter password");
      }
      const response = await fetch(
        `${url}/api/user/profile/updatePassword`,
        {
          method: "PATCH",
          body: JSON.stringify({ password, newPassword }),
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        },
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMessage(`${data}`);
        setConfirm(!confirm);
      } else {
        setError(data);
        setErrorColor("error");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setErrorColor("error");
    }
  };

  //   deleteAccount
  const deleteAccount = async (e) => {
    e.preventDefault();
    const userpassword = user_password;
    try {
      const response = await fetch(
        `${url}/api/user/profiledelete/:id`,
        {
          method: "DELETE",
          body: JSON.stringify({ userpassword }),
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        },
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMessage(`Your account has been deleted successfully`);
        setPasswordConfirm(!passwordConfirm);
        setAccDeleteConfirm(!accDeleteConfirm);
      } else {
        throw Error(data);
      }
    } catch (error) {
      setError(error.message);
      setErrorColor("error");
    }
  };

  //   hide scollbars
  if (confirm || deleteConfirm || passwordConfirm || accDeleteConfirm) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  if (accDeleteConfirm) {
    setTimeout(() => {
      navigate("/logout");
    }, 1000);
  }
  return (
    <>
      {/* information change confirmation */}
      {confirm && (
        <div className="popupContainer flexRow center itemsCenter padding10">
          <div className="popup flexColumn center secondaryColor borderRadius15 boxShadow flexColumn padding20  center itemsCenter">
            <h2 className="mainFont">{message} </h2>
            <button
              className="smallCardButton mainColor margin10"
              onClick={() => {
                navigate(0);
              }}>
              Confirm
            </button>
          </div>
        </div>
      )}
      {/* logout confirmation */}
      {logoutConfirm && (
        <div className="popupContainer flexRow center itemsCenter padding10">
          <div className="popup flexColumn center secondaryColor borderRadius15 boxShadow flexColumn padding20  center itemsCenter">
            <h2 className="mainFont textCenter largerFont">{logoutMessage} </h2>
            <button
              className="smallCardButton mainColor margin10"
              onClick={() => {
                navigate("/logout");
              }}>
              Confirm
            </button>
          </div>
        </div>
      )}
      {/* delete warning */}
      {deleteConfirm && (
        <div className="popupContainer flexRow center itemsCenter padding10">
          <div className="popup flexColumn center secondaryColor borderRadius15 boxShadow flexColumn padding20  center itemsCenter">
            <h1 className="mainFont error padding10 largeFont borderRadius10">
              WARNING
            </h1>
            <h2 className="mainFont largeFont textCenter">
              Are you sure you want to delete your account? All blogs and drafts
              will be lost
            </h2>
            <div className="flexRow margin10">
              <button
                className="smallCardButton mainColor mainFont margin10"
                onClick={() => {
                  setDeleteConfirm(!deleteConfirm);
                }}>
                Cancel
              </button>
              <button
                className="smallCardButton mainColor mainFont margin10"
                onClick={() => {
                  setPasswordConfirm(!passwordConfirm);
                  setDeleteConfirm(!deleteConfirm);
                }}>
                Proceed with Deletion
              </button>
            </div>
          </div>
        </div>
      )}
      {/* account deletion password confirmation */}
      {passwordConfirm && (
        <div className="popupContainer flexRow center itemsCenter padding10">
          <div className="popup flexColumn center secondaryColor borderRadius15 boxShadow flexColumn padding20  center itemsCenter">
          
            <form onSubmit={deleteAccount}>
              {error && (
                <h2
                  className={`${errorColor} padding10 selfCenter mainFontColor largeFont`}>
                  {error}
                </h2>
              )}
              <div className="flexRow spaceBetween alignCenter itemsCenter padding10">
                <label
                  htmlFor="username"
                  className="mainFont largeFont weight700 secondaryFontColor">
                  Enter password{" "}
                </label>
                <input
                  className="largeFont weight700 secondaryFontColor padding5"
                  value={user_password}
                  type="password"
                  onChange={(e) => {
                    setUser_password(e.target.value);
                  }}
                />
              </div>

              <div className="flexRow center margin10">
                <button
                  className="smallCardButton mainColor mainFont margin10"
                  onClick={() => {
                    setPasswordConfirm(!passwordConfirm);
                    setUser_password("")
                  }}>
                  Cancel
                </button>
                <button
                  className="smallCardButton mainColor mainFont margin10"
                  type="submit">
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* account delete success */}
      {accDeleteConfirm && (
        <div className="popupContainer flexRow center itemsCenter padding10">
          <div className="popup flexColumn center secondaryColor borderRadius15 boxShadow flexColumn padding20  center itemsCenter">
            <h2 className="mainFont largeFont">{message} </h2>
          </div>
        </div>
      )}
      <PagesandSidebar>
        <div className="side">
          <Sidebar />
        </div>
        <div className="page">
          <div className="settings secondaryColor flexColumn borderRadius10 boxShadow padding20">
            <div className="settingsTop borderRadius10 flexColumn spaceBetween padding20 margin10 boxShadow">
              <div className="mainFont secondaryFontColor">
                {/* Username form */}
                <h2 className="mainColor padding10">Change Username</h2>
                <div className="flexColumn smallFont margin10">
                  <h2>Username: {user.username}</h2>
                  <span>
                    <button
                      className="smallCardButton mainColor mainFont"
                      onClick={() => {
                        setUsernameModal(!usernameModal);
                      }}>
                      Change Username
                    </button>
                  </span>

                  {usernameModal && (
                    <div className="">
                      <div>
                        {error && (
                          <h2
                            className={`${errorColor} padding10 mainFontColor largeFont`}>
                            {error}
                          </h2>
                        )}
                        <form className="modal" onSubmit={changeUsername}>
                          <div className="flexRow spaceBetween alignCenter itemsCenter padding10 flexColumnMd itemsStartMd">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              Current Username{" "}
                            </label>
                            {userData && (
                              <input
                                className="largeFont weight700 secondaryFontColor padding5"
                                value={userData.username}
                                type="text"
                                readOnly
                              />
                            )}
                          </div>
                          <div className="flexRow spaceBetween alignCenter itemsCenter padding10 flexColumnMd itemsStartMd">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              New Username{" "}
                            </label>
                            <input
                              className="largeFont weight700 secondaryFontColor padding5"
                              value={user_name}
                              type="text"
                              onChange={(e) => {
                                setUser_name(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flexRow spaceBetween alignCenter itemsCenter padding10 flexColumnMd itemsStartMd">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              Enter password{" "}
                            </label>
                            <input
                              className="largeFont weight700 secondaryFontColor padding5"
                              value={user_password}
                              type="password"
                              onChange={(e) => {
                                setUser_password(e.target.value);
                              }}
                            />
                          </div>
                          <div className="padding10">
                            <button
                              className="mainColor mainFont smallCardButton"
                              type="submit">
                              Confirm
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Name form */}
              <div className="name flexColumn mainFont secondaryFontColor">
                <h2 className="mainColor padding10">Change Name</h2>
                <div className="flexColumn smallFont margin10">
                  <h2>Name: {prevName}</h2>
                  <span>
                    <button
                      className="smallCardButton mainColor mainFont"
                      onClick={() => {
                        setNameModal(!nameModal);
                      }}>
                      Change Name
                    </button>
                  </span>
                  {nameModal && (
                    <div className="">
                      <div>
                        {error && (
                          <h2
                            className={`${errorColor} padding10 mainFontColor largeFont`}>
                            {error}
                          </h2>
                        )}
                        <form className="modal" onSubmit={changeName}>
                          <div className="flexColumnMd itemsStartMd flexRow spaceBetween alignCenter itemsCenter padding10">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              Current Name{" "}
                            </label>
                            {userData && (
                              <input
                                className="largeFont weight700 secondaryFontColor padding5"
                                value={prevName}
                                type="text"
                                readOnly
                              />
                            )}
                          </div>
                          <div className="flexColumnMd itemsStartMd flexRow spaceBetween alignCenter itemsCenter padding10">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              New Name{" "}
                            </label>
                            <input
                              className="largeFont weight700 secondaryFontColor padding5"
                              value={name}
                              type="text"
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flexColumnMd itemsStartMd flexRow spaceBetween alignCenter itemsCenter padding10">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              Enter password{" "}
                            </label>
                            <input
                              className="largeFont weight700 secondaryFontColor padding5"
                              value={user_password}
                              type="password"
                              onChange={(e) => {
                                setUser_password(e.target.value);
                              }}
                            />
                          </div>
                          <div className="padding10">
                            <button
                              className="mainColor mainFont smallCardButton"
                              type="submit">
                              Confirm
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Email */}
              <div className="email mainFont flexColumn secondaryFontColor">
                <h2 className="mainColor padding10">Change E-mail</h2>
                <div className="flexColumn smallFont margin10">
                  <h2>Email: {prevEmail}</h2>
                  <span>
                    <button
                      className="smallCardButton mainColor mainFont"
                      onClick={() => {
                        setEmailModal(!emailModal);
                      }}>
                      Change Email
                    </button>
                  </span>

                  {emailModal && (
                    <div className="">
                      <div>
                        {error && (
                          <h2
                            className={`${errorColor} padding10 mainFontColor largeFont`}>
                            {error}
                          </h2>
                        )}
                        <form className="modal" onSubmit={changeEmail}>
                          <div className="flexColumnMd itemsStartMd flexRow spaceBetween alignCenter itemsCenter padding10">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              Current Email{" "}
                            </label>
                            {userData && (
                              <input
                                className="largeFont weight700 secondaryFontColor padding5"
                                value={prevEmail}
                                type="text"
                                readOnly
                              />
                            )}
                          </div>
                          <div className="flexColumnMd itemsStartMd flexRow spaceBetween alignCenter itemsCenter padding10">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              New Email{" "}
                            </label>
                            <input
                              className="largeFont weight700 secondaryFontColor padding5"
                              value={email}
                              type="text"
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flexColumnMd itemsStartMd flexRow spaceBetween alignCenter itemsCenter padding10">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              Enter password{" "}
                            </label>
                            <input
                              className="largeFont weight700 secondaryFontColor padding5"
                              value={user_password}
                              type="password"
                              onChange={(e) => {
                                setUser_password(e.target.value);
                              }}
                            />
                          </div>
                          <div className="padding10">
                            <button
                              className="mainColor mainFont smallCardButton"
                              type="submit">
                              Confirm
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="settingsmiddle padding20 margin10 borderRadius10 boxShadow flexColumn spaceBetween padding10">
              {/* Change Password */}
              <div className="password mainFont flexColumn secondaryFontColor">
                <h2 className="mainColor padding10">Change Password</h2>
                <div className="flexColumn smallFont margin10">
                  <span>
                    <button
                      className="smallCardButton mainColor mainFont"
                      onClick={() => {
                        setPasswordModal(!passwordModal);
                      }}>
                      Change Password
                    </button>
                  </span>
                  {passwordModal && (
                    <div className="">
                      <div>
                        {error && (
                          <h2
                            className={`${errorColor} padding10 mainFontColor largeFont`}>
                            {error}
                          </h2>
                        )}
                        <form className="modal" onSubmit={changePassword}>
                          <div className="flexColumnMd itemsStartMd flexRow spaceBetween alignCenter itemsCenter padding10">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              Current Password{" "}
                            </label>
                            <input
                              className="largeFont weight700 secondaryFontColor padding5"
                              value={user_password}
                              type="password"
                              onChange={(e) => {
                                setUser_password(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flexColumnMd itemsStartMd flexRow spaceBetween alignCenter itemsCenter padding10">
                            <label
                              htmlFor="username"
                              className="mainFont largeFont weight700 secondaryFontColor">
                              New Password{" "}
                            </label>
                            <input
                              className="largeFont weight700 secondaryFontColor padding5"
                              value={newpassword}
                              type="password"
                              onChange={(e) => {
                                setNewpassword(e.target.value);
                              }}
                            />
                          </div>

                          <div className="padding10">
                            <button
                              className="mainColor mainFont smallCardButton"
                              type="submit">
                              Confirm
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="settingslow padding20 margin10 borderRadius15 boxShadow flexColumn spaceBetween padding10">
              {/* Delete Account */}
              <div className="account mainFont secondaryFontColor">
                <h2 className="mainColor padding10">Delete Account</h2>
                <div className="flexColumn smallFont margin10"></div>
                <button
                  className="largeCardButton mainFont mainColor"
                  onClick={() => setDeleteConfirm(!deleteConfirm)}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </PagesandSidebar>
    </>
  );
};
