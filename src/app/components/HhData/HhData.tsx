import {HhDataProps} from "./HhData.props";
import {JSX} from "react";
import Card from "../Card/Card";
import splitByThree from "@/app/helpers/splitByThree";

import style from './HhData.module.css';


const HhData = ({ className, ...props }: HhDataProps): JSX.Element  => {
    return (
        <div className={style.hh} >
            <Card color = 'white' className={style.hhFirstCard} >
                <div className={style.cardStatHeader}>Всего вакансий</div>
                <div className={style.firstCardCounter}>{props.count}</div>
            </Card>
            <Card className={style.hhSecondCard} >
                
                <div className={style.grop}>
                    <div className={style.cardStatHeader}>Начальный</div>
                    <div className={style.secondCardCounter}>{splitByThree(props.juniorSalary)}</div>
                </div>
                <div className={style.grop}>
                    <div className={style.cardStatHeader}>Средний</div>
                    <div className={style.secondCardCounter}>{splitByThree(props.middleSalary)}</div>
                </div>
                <div className={style.grop}>
                    <div className={style.cardStatHeader}>Проффесионал</div>
                    <div className={style.secondCardCounter}>{splitByThree(props.seniorSalary)}</div> 
                </div>
            </Card>
            
        </div>
    );
};

export default HhData;