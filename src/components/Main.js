import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import CardContext from '../contexts/CardContext.js';

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const userData = React.useContext(CurrentUserContext);
  const CurrentCard = React.useContext(CardContext);

  React.useEffect(() => {
    api.getCards()
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
            <img className="profile__avatar-img" src={userData.avatar} alt={`аватар пользователя ${userData.name}`} />
            <button
              className="profile__avatar-btn"
              type="button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__title">{userData.name}</h1>
              <button
                onClick={props.onEditProfile}
                aria-label="edit"
                title="edit"
                type="button"
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__subtitle">{userData.about}</p>
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
            <CardContext.Provider value={item}>
           <Card key={item._id} onCardClick={props.onCardClick}
          ></Card>
          </CardContext.Provider>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
