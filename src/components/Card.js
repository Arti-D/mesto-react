function Card(props) {
    function handleCardClick() {
      props.onCardClick({url: props.link, title: props.name});
    }
    return (
        <li className="elems__item elem">
            <img src={props.link} alt={props.name}className="elems__img" onClick={handleCardClick}/>
            <div className="elems__wrapper">
                <h2 className="elems__title">{props.name}</h2>
                <div className="elems__like-wrapper">
                    <button type="button" className="elems__like"></button>
                    <p className="elems__number-of-likes">{props.like}</p>
                </div>
            </div>
            <button className="elems__remove-btn" type="button"></button>
        </li>
    )
}

export default Card