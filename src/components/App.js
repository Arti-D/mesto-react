import React from 'react'
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }
    function handleCardClick(data) {
        setSelectedCard(data)
        // console.log(url);
    }
    function closeAllPopups() {
        setIsAddPlacePopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard(null)
    }
  return (
    <div className="page">
    <Header />  
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
    <Footer />
    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <input id="avatar-link-input" className="popup__input popup__input_type_link" type="url" name="avatar"
                    placeholder="Ссылка на картинку" autoComplete="off" required />
                <span id="avatar-link-input-error" className="error"></span>
                <button className="popup__btn popup-avatar__make-btn" type="submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <input id="img-title-input" className="popup__input popup__input_type_title" type="text"
                    name="name" placeholder="Название" maxLength="30" minLength="2" autoComplete="off" />
                <span id="img-title-input-error" className="error"></span>
                <input id="img-link-input" className="popup__input popup__input_type_link" type="url" name="link"
                    placeholder="Ссылка на картинку" autoComplete="off" required />
                <span id="img-link-input-error" className="error"></span>
                <button className="popup__btn popup-add__make-btn" type="submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <input id="name-input" name="name" type="text" placeholder="Имя"
                    className="popup__input popup__input_type_name" minLength="2" maxLength="40" autoComplete="off"
                    required />
                <span id="name-input-error" className="error"></span>
                <input id="about-input" name="about" type="text" placeholder="О себе"
                    className="popup__input popup__input_type_about" minLength="2" maxLength="200" autoComplete="off"
                    required />
                <span id="about-input-error" className="error"></span>
                <button className="popup__btn popup__save-btn" type="submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm title="Вы уверены?" name="sure">
        <button className="popup__btn popup-sure__btn" type="button">Да</button>
    </PopupWithForm>
    <ImagePopup card={selectedCard} onClose={closeAllPopups} ></ImagePopup>
    </div>
  );
}

export default App;

