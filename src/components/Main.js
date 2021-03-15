import React from "react";
import ApiElement from "../utils/Api.js";
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    ApiElement.getUserInfo()
      .then((userData) => {
        setUserAvatar(userData.avatar);
        setUserDescription(userData.about);
        setUserName(userData.name);
        // console.log(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    ApiElement.getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <section className="profile">
        <div className="profile__main">
          <div className="profile__avatar">
            <img className="profile__avatar-img" src={userAvatar} />
            <button
              className="profile__avatar-btn"
              type="button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__title">{userName}</h1>
              <button
                onClick={props.onEditProfile}
                aria-label="edit"
                title="edit"
                type="button"
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onAddPlace}
          aria-label="edit"
          title="add"
          type="button"
        ></button>
      </section>
      <section className="elems">
        <ul className="elems__list">
          {cards.map((item) => (
           <Card
            key={item._id}
            name={item.name}
            link={item.link}
            like={item.likes.length}
            onCardClick={props.onCardClick}
          ></Card>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
