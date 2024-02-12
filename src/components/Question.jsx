
import classes from '../modules/Question.module.scss'

function Question ({data, selectedAnswer, onAnswerSelect }) {
    return(
        <div className={classes['question-container']}>
              <h2>{data.question}</h2>
              <div className={classes['options-container']}>
                 {data.options.map((option, index ) => 
                   <div
                      key={index}
                      className={`option${selectedAnswer === option ? 'Done' :''}`}
                      onClick={() => onAnswerSelect(option)}
                      >
                        {option}
                   </div>
                 )}
              </div>
        </div>

    );
}

export default Question