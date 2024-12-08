import { useParams } from 'react-router-dom';
import s from './WorkshopCard.module.css'

const WorkshopCard = () => {
    let { id: workshopId } = useParams();
    return (
        <div className={s.workshopWrapper}>Workshop id: {workshopId}</div>
    )
}

export default WorkshopCard