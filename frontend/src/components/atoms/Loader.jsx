import Icon from './Icon';
import './Loader.css';

const Loader = ({ 
  text = "Cargando", 
  words = [] 
}) => {
  return (
    <div className="loader-wrapper">
      <div className="loader-card">
        <div className="loader">
          <Icon name="spinner" className="fa-spin loader-icon" />
          <p>{text}</p>
          {words && words.length > 0 && (
            <div className="loader-words">
              {(() => {
                // La animación CSS requiere exactamente 4 palabras únicas + 1 repetida al final
                const safeWords = [...words, '', '', '', ''].slice(0, 4);
                const displayWords = [...safeWords, safeWords[0]];
                
                return displayWords.map((word, index) => (
                  <span key={index} className="loader-word">{word}</span>
                ));
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Loader;
