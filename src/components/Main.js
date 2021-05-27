import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import CardContext from '../contexts/CardContext.js';

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const userData = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api.getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);


  function handleCardDelete(card) {
    api.deleteCard(card._id).then((res) => {
      console.log(res);
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === userData._id);
    if (isLiked) {
      api.delLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
    } else {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
    }
} 

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
           <Card onCardLike={handleCardLike} key={item._id} onCardClick={props.onCardClick} onCardDelete={handleCardDelete}
          ></Card>
          </CardContext.Provider>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
