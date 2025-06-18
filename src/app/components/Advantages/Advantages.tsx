
import Htag from '../Htag/Htag';
import { AdvantagesProps } from './Advantages.props';
import { JSX } from 'react';
import cn from 'classnames';
import style from './Advantages.module.css';

//адова куча проверок, из за не пунктуальности бэкенда (не пустые массивы припустых обьектах)
// чтоб не рендерить пустые заголовки и блоки (плывет верстка и не понятно, что это за блоки)
const Advantages = ({ className, advantages}: AdvantagesProps): JSX.Element  => {
    return ( (advantages&& advantages[0].title == '' && advantages[0].description == '') ? <></> :
        <div className = {cn(style.advantages, className)}>
                <Htag tag='h2'>Преимущества</Htag>
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