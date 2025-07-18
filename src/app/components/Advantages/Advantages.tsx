import Htag from '../Htag/Htag';
import { AdvantagesProps } from './Advantages.props';
import { JSX } from 'react';
import cn from 'classnames';
import style from './Advantages.module.css';

// a bunch of checks because of backend inconsistency (non-empty arrays with empty objects)
// to avoid rendering empty headings and blocks (layout breaks and it's unclear what these blocks are)
const Advantages = ({ className, advantages}: AdvantagesProps): JSX.Element  => {
    return ( (advantages&& advantages[0].title == '' && advantages[0].description == '') ? <></> :
        <div className = {cn(style.advantages, className)}>
                <Htag tag='h2'>Advantages</Htag>
                {advantages && advantages.map((advantage) => 
                    <div key={advantage._id} className={style.advantagesItem}>    
                        <div className={style.advantageTitle}>
                            <img src="/icons/adv/advantage-icon.svg" alt="advantage" className={style.advIcon} />
                            {advantage.title}
                        </div>
                            {advantage.description && <div className={style.advantageText}>{advantage.description}</div>}
                        </div>
                )}
        </div>
    );
};

export default Advantages;