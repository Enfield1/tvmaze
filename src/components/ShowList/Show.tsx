import * as React from 'react';
import {useCallback} from 'react';
import {Show} from '../../types/show';
import {Badge, Typography} from 'antd';
import './show.css';

interface ShowProps {
    show: Show;
}

const Show = (props: ShowProps): JSX.Element => {
    const {show} = props;

    const getBudgeColor = useCallback((rating: number) => {
        let color = 'gray';
        if (rating > 7) {
            color = 'green';
        } else if (rating < 5) {
            color = 'red';
        }
        return color;
    }, []);

    const getPremieredYear = useCallback((date: string) => {
        return new Date(date).getFullYear();
    }, []);

    return (
        <Badge.Ribbon
            text={show.rating.average === null ? '—' : show.rating.average}
            color={getBudgeColor(show.rating.average)}
        >
            <div className="show-list-card">
                <img className='show-list-card-cover' src={show.image.medium} alt={`${show.name} image`}/>
                <Typography.Title className='show-list-card-title' level={5} title={show.name} ellipsis={{rows: 2}}>
                    {show.name}
                </Typography.Title>
                <Typography.Text type="secondary">
                    {getPremieredYear(show.premiered)}, {show.genres[0]}
                </Typography.Text>
            </div>
        </Badge.Ribbon>
    );
};

export default React.memo(Show);
